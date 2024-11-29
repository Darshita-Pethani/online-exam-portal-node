const mailer = new (require("../Utils/mailer"))();
const {
    results: resultsSchema,
    users: usersSchema,
    exams: examsSchema,
    exam_types: examTypesSchema,
    subjects: subjectsSchema
} = require("../Database/Schema");
require("dotenv").config();
const { STATUS, STATUS_CODES, QUESTION_TYPES_ID } = require("../config/constant");
const { Op } = require("sequelize");


class resultsModel {

    // Get student result
    async getResult(userInfo) {

        let getResult = await resultsSchema.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
            where: {
                user_id: userInfo?.id
            },
            include: [
                {
                    model: usersSchema,
                    attributes: ['first_name', 'last_name', 'full_name'],
                }
            ]
        })

        if (!getResult) {
            return { status: STATUS_CODES.NOT_FOUND }
        }
        return getResult
    }

    // Get all students results
    async getAllResultsList(bodyData) {

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
            sortBy = [['id', 'desc']];
        };

        var filterQuery = {};
        var userQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        if (filter?.id === 'full_name') {
                            userQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
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
            });
        };


        return await resultsSchema.findAndCountAll({
            where: {
                isDelete: STATUS.NOTDELETED,
                ...filterQuery
            },
            include: [
                {
                    model: usersSchema,
                    where: {
                        ...userQuery
                    },
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
            ],
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
        });
    };
}

module.exports = resultsModel;