const mailer = new (require("../Utils/mailer"))();
const {
    students: studentsSchema,
    student_tokens: studentsTokenSchema,
    student_otp_verifications: studentOtpVerificationsSchema,
} = require("../Database/Schema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createHashPassword, generateOtp, unlinkRemoveFile } = require('../Utils/helpers');
const { STATUS, STATUS_CODES, STATUS_MESSAGES, IMG_FOLDER_NAME } = require("../config/constant");
const moment = require('moment');
const { Op } = require("sequelize");
const FileManager = new (require("../Utils/file_manager"));

class studentModel {

    // sign up
    async signUp(bodyData, file) {

        let check_email = await studentsSchema.findOne({
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
            url = FileManager.createLiveImageURL(file, IMG_FOLDER_NAME.studentS, 'single');
        }
        bodyData.image = url;
        bodyData.password = await createHashPassword(bodyData.password);

        return await studentsSchema.create(bodyData);
    }

    // for auth
    async getStudentTokenInfo(access_token) {
        return await studentsTokenSchema.findOne({
            where: {
                access_token,
            },
            attributes: ["student_id", "createdAt", "updatedAt"],
            include: [
                {
                    model: studentsSchema,
                    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                    where: {
                        status: STATUS.ACTIVE,
                    },
                },
            ],
        });
    }

    // sign in
    async signIn(data) {
        let checkEmail = await studentsSchema.findOne({
            where: {
                email: data.email,
                isDelete: STATUS.NOTDELETED,
            }
        })
        if (!checkEmail) {
            return {
                status: STATUS_CODES.NO_CONTENT,
            }
        }
        if (checkEmail) {
            var check = await bcrypt.compare(data.password, checkEmail.password);
            if (check === false) {
                return {
                    status: STATUS_CODES.VALIDATION_ERROR,
                }
            }
            if (checkEmail.status === STATUS.INACTIVE) {
                return {
                    status: STATUS_CODES.NOT_FOUND,
                }
            }
            var token = jwt.sign({ id: checkEmail.id }, process.env.SECRET_KEY);
            var studentTokenData = {
                access_token: token,
                student_id: checkEmail.id,
            }

            const findId = await studentsTokenSchema.findOne({
                where: {
                    student_id: checkEmail.id
                },
            })
            if (findId) {
                await studentsTokenSchema.destroy({
                    where: {
                        student_id: checkEmail.id
                    },
                })
            }
            await studentsTokenSchema.create(studentTokenData);
            let studentData = await studentsSchema.findOne({
                where: {
                    id: checkEmail.id
                },
            });
            return {
                token: token,
                data: studentData,
            }
        }
    }

    // get student by id
    async getstudentById(id) {
        const getData = await studentsSchema.findOne({
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            where: {
                status: STATUS.ACTIVE,
                isDelete: STATUS.NOTDELETED,
                id: id
            }
        });
        if (!getData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }
        return getData
    }

    // Update student Profile
    async updatestudentProfile(bodyData, file) {
        const studentFound = await studentsSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            }
        })
        if (!studentFound) {
            return { status: STATUS_CODES.NOT_FOUND }
        }
        let checkEmail = await studentsSchema.findOne({
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


        if (file && typeof file === "object") {
            if (studentFound?.image !== null) {
                unlinkRemoveFile(IMG_FOLDER_NAME.studentS, studentFound?.image)
            }
            let url = FileManager.createLiveImageURL(file, IMG_FOLDER_NAME.studentS, 'single');
            bodyData.image = url;
        }
        bodyData.password = await createHashPassword(bodyData.password);
        return await studentsSchema.update(bodyData, {
            where: {
                id: bodyData?.id,
            }
        })

    }

    // delete student Profile
    async deletestudentProfile(id) {
        const studentFound = await studentsSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            }
        })
        if (!studentFound) {
            return { status: STATUS_CODES.NOT_FOUND }
        }
        return await studentsSchema.update({ isDelete: 1 }, {
            where: {
                id: id,
            }
        })
    }

    // student sign out
    async studentSignOut(studentInfo, header) {
        if (studentInfo != null) {
            let student = await studentsSchema.findOne({
                where: {
                    id: studentInfo?.id,
                    status: STATUS.ACTIVE,
                },
            });

            if (!student) {
                return { status: STATUS_CODES.NOT_FOUND };
            }

            return await studentsTokenSchema.destroy({
                where: {
                    access_token: header?.authorization,
                },
            });
        } else {
            return true;
        }
    }

    //Change Password
    async changePassword(bodyData, studentInfo) {
        let check_user = await studentsSchema.findOne({
            where: { id: studentInfo?.id, status: STATUS.ACTIVE },
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
                return await studentsSchema.update(password_data, {
                    where: {
                        id: studentInfo?.id,
                    },
                });
            }
        }
    }

    // forgot User Password Using Otp
    async forgotPasswordUsingOtp(data) {
        var email = data?.email;

        let checkEmail = await studentsSchema.findOne({
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
                student_id: id,
                expireAt: date
            }

            return await studentOtpVerificationsSchema.create(registerData);
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

        let getOtp = await studentOtpVerificationsSchema.findAll({
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

            await studentOtpVerificationsSchema.destroy({
                where: {
                    otp: oldOtp
                }
            });

            return {
                status: STATUS_CODES.NOT_ACCEPTABLE
            }
        }

        await studentOtpVerificationsSchema.destroy({
            where: {
                otp: oldOtp
            }
        });

        return {
            student_id: transformedArray[0]?.student_id
        }
    }

    // Reset User Password Using OTP
    async resetPasswordUsingOtp(data, id) {

        var newPassword = data?.new_password;
        var confirmPassword = data?.confirm_password;

        if (newPassword === confirmPassword) {

            let checkId = await studentsSchema.findOne({
                where: { id: id }
            })

            if (checkId) {
                let hashPassword = await createHashPassword(newPassword);
                let registerData = {
                    password: hashPassword
                }

                let user = await studentsSchema.update(registerData, {
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

    //Get Get all students list
    async getstudentsList(bodyData) {
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
            sortBy = [['name', 'asc']];
        }
        var filterQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                        };
                    }
                    else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });;
        }

        return await studentsSchema.findAll({
            where: {
                ...filterQuery
            },
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
        });
    }
}

module.exports = studentModel;
