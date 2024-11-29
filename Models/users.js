const mailer = new (require("../Utils/mailer"))();
const {
    users: usersSchema,
    roles: rolesSchema,
    modules: moduleSchema,
    user_tokens: usersTokenSchema,
    user_otp_verifications: userOtpVerificationsSchema,
    user_relations: userRelationsSchema,
    standard_user_relations: standardUserRelationsSchema,
    exams: examsSchema,
    standards: standardsSchema,
    results: resultsSchema,
    subjects: subjectsSchema,
    user_exam_enrolls: userExamEnrollsSchema,
    exam_types: examTypesSchema
} = require("../Database/Schema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createHashPassword, generateOtp, unlinkRemoveFile } = require('../Utils/helpers');
const { STATUS, STATUS_CODES, STATUS_MESSAGES, IMG_FOLDER_NAME, ROLE_TYPES_ID } = require("../config/constant");
const moment = require('moment');
const { Op } = require("sequelize");
const FileManager = new (require("../Utils/file_manager"));

class userModel {

    // add user
    async addUser(userInfo, bodyData, file) {

        let check_email = await usersSchema.findOne({
            where: { email: bodyData.email }
        })

        if (check_email) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            };
        }

        if (bodyData.password !== bodyData.confirm_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA
            };

        }

        let url;
        if (file && typeof file === "object") {
            url = FileManager.createLiveImageURL(file, IMG_FOLDER_NAME.USERS, 'single');
        }

        let emailPassword = {
            email: bodyData?.email,
            password: bodyData?.password
        }

        await mailer.sendUserEmailAndPassword(emailPassword);
        bodyData.image = url;
        bodyData.password = await createHashPassword(bodyData?.password);

        const addedUserData = await usersSchema.create(bodyData);

        let data = {
            user_id: addedUserData?.dataValues?.id,
            added_by: userInfo?.id,
        }
        await userRelationsSchema.create(data);

        if (parseInt(bodyData?.role_id) === ROLE_TYPES_ID?.STUDENTS) {

            let data = {
                user_id: addedUserData?.dataValues?.id,
                standard_id: bodyData?.standard_id,
                currant_standard: 1
            }
            await standardUserRelationsSchema.create(data);
        }

        return true

    }

    // for auth
    async getuserTokenInfo(access_token) {
        return await usersTokenSchema.findOne({
            where: {
                access_token,
            },
            attributes: ["user_id", "createdAt", "updatedAt"],
            include: [
                {
                    model: usersSchema,
                    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                    where: {
                        status: STATUS.ACTIVE,
                    },
                },
            ],
        });
    }

    // sign in
    async signIn(bodyData) {

        let check_email = await usersSchema.findOne({
            where: {
                email: bodyData?.email,
                status: STATUS.ACTIVE
            },
        });

        if (!check_email) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.USER,
            };
        }

        let match_password = await bcrypt.compare(
            bodyData?.password,
            check_email?.password
        );

        if (!match_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.PASSWORD.INCORRECT,
            };
        }
        let findToken = await usersTokenSchema.findOne({
            where: {
                user_id: check_email?.id,
            },
        })

        if (findToken) {
            await usersTokenSchema.destroy({
                where: {
                    user_id: check_email?.id,
                },
            })
        }

        let token = jwt.sign({ email: check_email?.email }, process.env.SECRET_KEY);
        await usersTokenSchema.create({
            access_token: token,
            user_id: check_email?.id,
        });

        let userData = await usersSchema.findOne({
            where: {
                id: check_email?.id
            },
            include: [
                {
                    model: rolesSchema,
                    attributes: ["id", "name"],
                    include: {
                        model: moduleSchema,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        through: {
                            attributes: [
                                "id",
                                "read_access",
                                "write_access",
                                "delete_access",
                            ],
                        },
                    },
                },
            ]
        })
        userData.dataValues.token = token;

        return userData;
    }

    // get user by id
    async getuserById(id) {
        const userData = await usersSchema.findOne({
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            where: {
                isDelete: STATUS.NOTDELETED,
                id: id
            },
            include: [
                {
                    model: rolesSchema,
                    attributes: ['name'],
                },
                {
                    model: userExamEnrollsSchema,
                    required: false,
                    include: [
                        {
                            model: resultsSchema,
                            where: { user_id: `${id}` },
                            required: false,
                            include: [
                                {
                                    model: examsSchema,
                                    required: false,
                                    attributes: ['id', 'subject_id', 'standard_id', 'exam_type_id', 'total_marks', 'date'],
                                    include: [
                                        {
                                            model: subjectsSchema,
                                            attributes: ['name'],
                                        },
                                        {
                                            model: standardsSchema,
                                            attributes: ['name'],
                                        },
                                        {
                                            model: examTypesSchema,
                                            attributes: ['name'],
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        const modifiedResults = userData?.user_exam_enrolls.flatMap((enroll) =>
            enroll?.results?.map((result) => ({
                result: {
                    user_enroll_year: moment(result?.createdAt).format('YYYY'),
                    ...result.toJSON(),
                }
            }))
        );

        const modifiedUserData = {
            ...userData.toJSON(),
            user_exam_enrolls: modifiedResults
        };

        return modifiedUserData;
    }

    // Update user Profile
    async updateUserProfile(userInfo, bodyData, file) {
        const userFound = await usersSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            }
        })
        if (!userFound) {
            return { status: STATUS_CODES.NOT_FOUND }
        }

        let checkEmail = await usersSchema.findOne({
            where: {
                email: bodyData?.email,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL
            }
        }

        let checkUseName = await usersSchema.findOne({
            where: {
                username: bodyData?.username,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkUseName) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.USERNAME
            }
        }
        if (file && typeof file === "object") {
            if (userFound?.image !== null) {
                unlinkRemoveFile(IMG_FOLDER_NAME.USERS, userFound?.image)
            }
            let url = FileManager.createLiveImageURL(file, IMG_FOLDER_NAME.USERS, 'single');
            bodyData.image = url;
        }
        await usersSchema.update(bodyData, {
            where: {
                id: bodyData?.id,
            }
        })

        let findUserRelationData = await userRelationsSchema.findOne(({
            where: {
                user_id: bodyData?.id,
            }
        }));

        if (findUserRelationData) {
            await userRelationsSchema.destroy({
                where: {
                    user_id: bodyData?.id,
                }
            });

            let data = {
                user_id: bodyData?.id,
                added_by: userInfo?.id,
            }
            await userRelationsSchema.create(data);
        }


        return { status: STATUS_CODES.ACCEPTED }
    }

    // user sign out
    async userSignOut(userInfo, header) {
        if (userInfo != null) {
            let user = await usersSchema.findOne({
                where: {
                    id: userInfo?.id,
                    status: STATUS.ACTIVE,
                },
            });

            if (!user) {
                return { status: STATUS_CODES.NOT_FOUND };
            }

            return await usersTokenSchema.destroy({
                where: {
                    access_token: header?.authorization,
                },
            });
        } else {
            return true;
        }
    }

    //Change Password
    async changePassword(bodyData, userInfo) {
        let check_user = await usersSchema.findOne({
            where: { id: userInfo?.id, status: STATUS.ACTIVE },
        });

        if (!check_user) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.USER,
            };
        }

        let old_match_password = await bcrypt.compare(
            bodyData?.old_password,
            check_user?.password
        );

        if (!old_match_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.PASSWORD.CURRENT_PASSWORD_MISMATCH,
            };
        } else {
            if (bodyData?.new_password !== bodyData?.confirm_new_password) {
                return {
                    status: STATUS_CODES.NOT_VALID_DATA,
                    message: STATUS_MESSAGES.PASSWORD.NOT_SAME,
                }
            } else {
                const new_hashPassword = await bcrypt.hash(bodyData?.new_password, 10);
                let password_data = {
                    password: new_hashPassword,
                };
                return await usersSchema.update(password_data, {
                    where: {
                        id: userInfo?.id,
                    },
                });
            }
        }
    }

    //Forgot Password
    async forgotPassword(bodyData) {
        let user = await usersSchema.findOne({
            where: {
                email: bodyData?.email,
            },
        });

        // IF user EXIST SEND RESPONSE
        if (!user) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.USER,
            };
        }

        let token = jwt.sign({ email: bodyData?.email }, process.env.SECRET_KEY);
        let reqBody = {
            email: bodyData?.email,
            token: token,
            expiredAt: MOMENT().add(1, "days").unix("X"),
            user_id: user?.id,
            access_token: token
        };

        await mailer.forgotPasswordEmail(reqBody);
        return await usersTokenSchema.create(reqBody);
    }

    //Reset Password
    async resetPassword(bodyData) {
        let token = bodyData.headers['user_reset_password'];
        let resetPasswordToken = await usersTokenSchema.findOne({
            where: {
                access_token: token,
            }
        });

        if (!resetPasswordToken) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.RESET_PASSWORD_ALREADY,
            }
        }

        if (bodyData?.new_password !== bodyData?.confirm_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.PASSWORD.NOT_SAME,
            }
        } else {
            let new_hashPassword = await bcrypt.hash(bodyData?.body?.new_password, 10);
            let password_data = {
                password: new_hashPassword,
            }
            await usersSchema.update(password_data, {
                where: {
                    id: resetPasswordToken?.user_id,
                    status: STATUS.ACTIVE,
                }
            });

            return await usersTokenSchema.destroy({
                where: { id: resetPasswordToken?.id },
            });
        }
    }

    // forgot User Password Using Otp
    async forgotPasswordUsingOtp(data) {
        var email = data?.email;

        let checkEmail = await usersSchema.findOne({
            where: { email: email }
        })

        if (checkEmail) {
            var id = checkEmail?.id;

            var otp = await generateOtp();
            var hashedOtp = await bcrypt.hash(otp, 10);

            const emailOtp = {
                email: email,
                otp: otp
            }

            var mail = await mailer.forgotPasswordEmail(emailOtp);

            var date = new Date();
            date.setMinutes(date.getMinutes() + 2);

            let registerData = {
                otp: hashedOtp,
                user_id: id,
                expireAt: date
            }

            return await userOtpVerificationsSchema.create(registerData);
        }
        else {
            return {
                status: STATUS_CODES.NOT_FOUND
            };
        }
    }

    // OTP Verification
    async otpVerification(data) {

        var otp = data?.otp;
        var date = new Date();

        let getOtp = await userOtpVerificationsSchema.findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        })

        let transformedArray = [];
        for (const item of getOtp) {
            let compareOTP = await bcrypt.compare(otp, item?.otp)
            if (compareOTP == true) {
                transformedArray.push(item);
                break;
            }
            else {
                return {
                    status: STATUS_CODES.NOT_FOUND
                };
            }
        }
        let oldOtp = transformedArray[0]?.otp;

        var olddate = transformedArray[0]?.expireAt;

        if (date > olddate) {

            await userOtpVerificationsSchema.destroy({
                where: {
                    otp: oldOtp
                }
            });

            return {
                status: STATUS_CODES.NOT_ACCEPTABLE
            }
        }

        await userOtpVerificationsSchema.destroy({
            where: {
                otp: oldOtp
            }
        });

        return {
            user_id: transformedArray[0]?.user_id
        }
    }

    // Reset User Password Using OTP
    async resetPasswordUsingOtp(data, id) {

        var newPassword = data?.new_password;
        var confirmPassword = data?.confirm_password;

        if (newPassword === confirmPassword) {

            let checkId = await usersSchema.findOne({
                where: { id: id }
            })

            if (checkId) {
                let hashPassword = await createHashPassword(newPassword);
                let registerData = {
                    password: hashPassword
                }

                let user = await usersSchema.update(registerData, {
                    where: {
                        id: id
                    }
                });

                return {
                    status: STATUS_CODES.SUCCESS
                }
            }

            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }
        else {
            return {
                status: STATUS_CODES.VALIDATION_ERROR
            };
        }
    }

    //Get Get all users list
    async getusersList(userInfo, bodyData) {
        var currentPage;
        var itemsPerPage;
        var lastRecordIndex;
        var firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData?.currentPage;
            itemsPerPage = bodyData?.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        }
        var sortBy = [];
        if (bodyData?.sortBy && bodyData?.sortBy?.length > 0) {
            bodyData?.sortBy?.map((sort) => {
                if (sort?.id !== "" && sort?.desc !== "") {
                    if (sort?.desc == true) {
                        sortBy?.push([sort?.id, "desc"]);
                    } else {
                        sortBy?.push([sort?.id, "asc"]);
                    }
                }
            });
        }
        if (sortBy?.length < 1) {
            sortBy = [['full_name', 'asc']];
        }
        var filterQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        if (filter?.id === 'date_of_birth') {
                            filterQuery[filter?.id] = {
                                [SEQUELIZE.Op.eq]: moment(filter?.value).format('YYYY-MM-DD'),
                            };
                        }
                        else {
                            filterQuery[filter?.id] = {
                                [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                            };
                        }
                    }
                    else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });;
        }

        return await usersSchema.findAndCountAll({
            where: {
                isDelete: STATUS.NOTDELETED,
                // id: { [SEQUELIZE.Op.not]: userInfo?.id },
                ...filterQuery
            },
            include: [
                {
                    model: rolesSchema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
        });
    }

    // Delete user
    async deleteUser(bodyData) {
        let userData = await usersSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!userData) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };


        return await usersSchema.update({ isDelete: STATUS.DELETED }, {
            where: { id: bodyData?.id },
        });
    };
}

module.exports = userModel;
