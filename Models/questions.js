const mailer = new (require("../Utils/mailer"))();
const { body } = require("express-validator");
const {
    questions: questionsSchema,
    options: optionsSchema,
    users: usersSchema,
    exams: examsSchema,
} = require("../Database/Schema");
require("dotenv").config();
const { STATUS, STATUS_CODES, QUESTION_TYPES_ID } = require("../config/constant");
const { Op, where } = require("sequelize");


class questionsModel {

    // Add questions
    async addQuestions(userInfo, bodyData) {

        let examData = await examsSchema.findOne({
            where: {
                id: bodyData?.exam_id,
            }
        })

        if (!examData) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            }
        }

        if (bodyData?.questionList) {
            await Promise.all(bodyData?.questionList?.map(async (data, index) => {
                let questionData = await questionsSchema.create({
                    exam_id: bodyData?.exam_id,
                    question: data?.question,
                    ans: data?.ans,
                    marks: data?.marks,
                    sortOrder: index + 1
                });

                if (data?.options) {
                    await Promise.all(data?.options?.map(async (optionData, index) => {
                        await optionsSchema.create({
                            question_id: questionData?.dataValues?.id,
                            option_value: optionData?.option_value,
                            sortOrder: index + 1
                        });
                    }))
                }

                // let findSortOrder = await optionsSchema.findAll({
                //     attributes: ['sortOrder', 'question_id', 'id'],
                //     where: {
                //         question_id: questionData?.dataValues?.id
                //     }
                // });

                // findSortOrder?.map(async (sort, index) => {
                //     let data = {
                //         sortOrder: index + 1
                //     }
                //     await optionsSchema.update(data, {
                //         where: {
                //             question_id: sort?.question_id,
                //             id: sort?.id,
                //         }
                //     });
                // })
            }));
        }

        return bodyData;
    }

    // Update questions
    async updateQuestions(userInfo, bodyData) {

        let idCheck = await questionsSchema.findOne({
            where: {
                exam_id: bodyData?.exam_id,
                isDelete: STATUS.NOTDELETED
            }
        })

        if (!idCheck) {
            return {
                status: STATUS_CODES.NOT_ACCEPTABLE,
            }
        }

        if (bodyData?.questionList) {
            await Promise.all(bodyData?.questionList?.map(async (data) => {
                await optionsSchema.destroy({
                    where: {
                        question_id: data?.id
                    }
                });

                await questionsSchema.update({
                    exam_id: bodyData?.exam_id,
                    question: data?.question,
                    ans: data?.ans,
                    marks: data?.marks,
                }, {
                    where: {
                        id: data?.id
                    }
                });

                if (data?.options) {
                    await Promise.all(data?.options?.map(async (optionData, index) => {
                        await optionsSchema.create({
                            question_id: data?.id,
                            option_value: optionData?.option_value,
                            "sortOrder": index + 1
                        });
                    }))
                }

                // let findSortOrder = await optionsSchema.findAll({
                //     attributes: ['sortOrder', 'question_id', 'id'],
                //     where: {
                //         question_id: data?.id
                //     }
                // });

                // findSortOrder?.map(async (sort, index) => {
                //     console.log('sort: ', sort?.sortOrder);
                //     let data = {
                //         "sortOrder": index + 1
                //     }

                //     await optionsSchema.update(data, {
                //         where: {
                //             question_id: sort?.question_id,
                //             id: sort?.id,
                //         }
                //     });
                // })
            }));
        }

        return bodyData;
    }

    // Delete questions
    async deleteQuestions(id) {
        let idCheck = await questionsSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            }
        })

        if (!idCheck) {
            return {
                status: STATUS_CODES.NOT_ACCEPTABLE,
            }
        }

        await optionsSchema.destroy({
            where: {
                question_id: id
            }
        })

        return await questionsSchema.update({
            isDelete: STATUS.DELETED
        },
            {
                where: {
                    id: id
                }
            });
    }

    // Get questions by id
    async getQuestionsByID(id) {
        let getIdData = await questionsSchema.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                id: id,
                status: STATUS.ACTIVE,
                isDelete: STATUS.NOTDELETED
            },
            include: [
                {
                    model: optionsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt',] }
                }
            ],
        });
        if (!getIdData) {
            return { status: STATUS_CODES.NOT_FOUND }
        }
        return getIdData
    }

    // Get all questions
    async getAllQuestionsList(bodyData) {
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
                    } else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });;
        }

        return await questionsSchema.findAll({
            where: {
                ...filterQuery
            },
            include: [
                {
                    model: optionsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt',] }
                }
            ],
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
        });
    }

    // Update sort order
    async updateOptionSortOrder(userInfo, bodyData) {

        const findId = await optionsSchema.findOne({
            attributes: ['sortOrder', 'question_id'],
            where: {
                id: bodyData?.id
            }
        });

        if (!findId) {
            return { status: STATUS_CODES.NOT_FOUND }
        }

        let old_sort_order = findId?.sortOrder

        await optionsSchema.update({ sortOrder: bodyData?.new_sort_order }, {
            where: {
                id: bodyData?.id
            }
        });

        if (bodyData?.new_sort_order > old_sort_order) {

            await optionsSchema.update({ sortOrder: SEQUELIZE.literal('sortOrder - 1') }, {
                where: {
                    sortOrder: {
                        [Op.gt]: old_sort_order, [Op.lte]: bodyData?.new_sort_order
                    },
                    question_id: findId?.question_id,
                    id: { [SEQUELIZE.Op.not]: bodyData?.id },
                }
            });
        }

        if (bodyData?.new_sort_order < old_sort_order) {

            await optionsSchema.update({ sortOrder: SEQUELIZE.literal('sortOrder + 1') }, {
                where: {
                    sortOrder: { [Op.gte]: bodyData?.new_sort_order, [Op.lt]: old_sort_order },
                    question_id: findId?.question_id,
                    id: { [SEQUELIZE.Op.not]: bodyData?.id },
                }
            });
        }

        return true;
    }

    // Update sort order
    async updateQuestionSortOrder(userInfo, bodyData) {

        const findId = await questionsSchema.findOne({
            attributes: ['sortOrder', 'exam_id'],
            where: {
                id: bodyData?.id
            }
        });


        if (!findId) {
            return { status: STATUS_CODES.NOT_FOUND }
        }

        let old_sort_order = findId?.sortOrder

        await questionsSchema.update({ sortOrder: bodyData?.new_sort_order }, {
            where: {
                id: bodyData?.id
            }
        });

        if (bodyData?.new_sort_order > old_sort_order) {
            await questionsSchema.update({ sortOrder: SEQUELIZE.literal('sortOrder - 1') }, {
                where: {
                    sortOrder: {
                        [Op.gt]: old_sort_order, [Op.lte]: bodyData?.new_sort_order
                    },
                    exam_id: findId?.exam_id,
                    id: { [SEQUELIZE.Op.not]: bodyData?.id },
                }
            });
        }

        if (bodyData?.new_sort_order < old_sort_order) {
            await questionsSchema.update({ sortOrder: SEQUELIZE.literal('sortOrder + 1') }, {
                where: {
                    sortOrder: { [Op.gte]: bodyData?.new_sort_order, [Op.lt]: old_sort_order },
                    exam_id: findId?.exam_id,
                    id: { [SEQUELIZE.Op.not]: bodyData?.id },
                }
            });
        }

        return true;
    }
}
module.exports = questionsModel;