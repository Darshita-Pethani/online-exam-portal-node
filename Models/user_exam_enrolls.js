const { body } = require("express-validator");
const { STATUS, STATUS_CODES, ROLE_TYPES_ID } = require("../config/constant");
const {
    user_exam_enrolls: userExamEnrollSchema,
    results: resultsSchema,
    questions: questionSchema,
    exams: examsSchema,
    users: usersSchema,
    exam_types: examTypesSchema,
    subjects: subjectsSchema,
} = require("../Database/Schema");
const { where } = require("sequelize");

class userExamEnrollsModel {

    //  Add user exam 
    async addUserExam(bodyData, userInfo) {
        if (userInfo.role_id === ROLE_TYPES_ID.STUDENTS) {
            let marks = [];
            await Promise.all(bodyData?.questionAns?.map(async (data) => {
                var findCorrectAns = await questionSchema.findOne({
                    where: {
                        isDelete: STATUS.NOTDELETED,
                        id: data?.question_id
                    }
                });

                let rightAns = findCorrectAns?.dataValues?.ans === data?.user_ans;

                if (rightAns) {
                    marks.push(findCorrectAns?.dataValues?.marks)
                }
            }));

            let addData = await userExamEnrollSchema.create({
                "user_id": userInfo?.id,
                "exam_id": bodyData?.exam_id,
            });

            let sum = 0;
            marks.map((index) => sum += index);

            let userResultData = await resultsSchema.create({ "user_id": userInfo?.id, "exam_id": bodyData?.exam_id, "total_marks": sum, "standard_id": bodyData?.standard_id, 'user_exam_enroll_id': addData?.dataValues?.id })
            return userResultData
        } else {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }
    }

    // Get user exam by id
    async getUserExamById(id) {

        let findData = await userExamEnrollSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED,
            }
        })
        if (!findData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userExamEnrollSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            },
            include: [
                {
                    model: usersSchema,
                    attributes: ["first_name", "last_name", "full_name"]
                },
                {
                    model: questionSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete', 'sortOrder'] },
                },
                {
                    model: examsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                },
                {
                    model: resultsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                }
            ]
        })

    }

    // Delete user exam enroll
    async deleteUserExam(id) {

        let findData = await userExamEnrollSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED,
            }
        })
        if (!findData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userExamEnrollSchema.update({ isDelete: STATUS.DELETED }, {
            where: {
                id: id
            }

        })
    }

    // Get list of  user exam enroll
    async getAllUserExam(bodyData, userInfo) {

        var currentPage;
        var itemsPerPage;
        var lastRecordIndex;
        var firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData?.currentPage;
            itemsPerPage = bodyData?.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        };

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
        };

        if (sortBy?.length < 1) {
            sortBy = [['id', 'asc']];
        };

        var filterQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                        }
                    }
                    else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });
        };

        return await userExamEnrollSchema.findAndCountAll(
            {
                where: {
                    isDelete: STATUS.NOTDELETED,
                    ...filterQuery,
                },
                include: [
                    {
                        model: usersSchema,
                        attributes: ["first_name", "last_name", "full_name"]
                    },
                    {
                        model: questionSchema,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete', 'sortOrder'] },
                    },
                    {
                        model: examsSchema,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                        include: [
                            {
                                model: examTypesSchema,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                            },
                            {
                                model: subjectsSchema,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                            },
                        ]
                    },
                    {
                        model: resultsSchema,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                    }
                ],
                offset: firstRecordIndex,
                limit: itemsPerPage,
                order: [...sortBy],
                attributes: { exclude: ["createdAt", "updatedAt", "sortOrder"] }
            }
        );
    }

    // Get user exam by exam id
    async getUserExamByExamId(bodyData) {

        var currentPage;
        var itemsPerPage;
        var lastRecordIndex;
        var firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData?.currentPage;
            itemsPerPage = bodyData?.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        };

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
        };

        if (sortBy?.length < 1) {
            sortBy = [['id', 'asc']];
        };

        var filterQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                        }
                    }
                    else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });
        };

        return await userExamEnrollSchema.findAndCountAll({
            where: {
                ...filterQuery,
                isDelete: STATUS.NOTDELETED
            },
            include: [
                {
                    model: usersSchema,
                    attributes: ["first_name", "last_name", "full_name"]
                },
                {
                    model: examsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                    include: [
                        {
                            model: examTypesSchema,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                        },
                        {
                            model: subjectsSchema,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                        },
                    ]
                },
            ]
        })


    }

}
module.exports = userExamEnrollsModel