const mailer = new (require("../Utils/mailer"))();
const {
    exams: examsSchema,
    users: usersSchema,
    subjects: subjectsSchema,
    questions: questionsSchema,
    options: optionsSchema,
    exam_types: examTypesSchema,
    exam_questiontype_relations: examQuestionTypeRelationsSchema,
    standards: standardSchema,
    question_types: questionTypeSchema,
    results: resultsSchema,
} = require("../Database/Schema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createHashPassword, generateOtp, unlinkRemoveFile } = require('../Utils/helpers');
const { STATUS, STATUS_CODES, QUESTION_TYPES_ID } = require("../config/constant");
const moment = require('moment');
const { Op, where } = require("sequelize");
const FileManager = new (require("../Utils/file_manager"));

class examModel {

    // Add exams
    async addExams(userInfo, bodyData) {

        let findExam = await examsSchema.findOne({
            where: {
                date: bodyData?.date,
                subject_id: bodyData?.subject_id,
                isDelete: STATUS.NOTDELETED,
            }
        });

        if (findExam) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
            }
        }
        bodyData.start_time = moment(bodyData.start_time, ["HH:mm"]).format("hh:mm A");
        let addExam = await examsSchema.create({ ...bodyData, user_id: userInfo?.id });

        if (bodyData?.questionType) {
            bodyData?.questionType?.map(async (data) => {
                await examQuestionTypeRelationsSchema.create({
                    exam_id: addExam?.dataValues?.id,
                    question_type_id: data?.question_type_id,
                    total_questions: data?.total_questions
                });
            });
        }

        return addExam
    }

    // Update exams
    async updateExams(userInfo, bodyData) {

        let idCheck = await examsSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            }
        });

        if (!idCheck) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
            }
        }

        await examQuestionTypeRelationsSchema.destroy({
            where: {
                exam_id: bodyData?.id
            }
        });
        bodyData.start_time = moment(bodyData.start_time, ["HH:mm"]).format("hh:mm A");
        let updateExam = await examsSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        });

        if (bodyData?.questionType) {
            bodyData?.questionType?.map(async (data) => {
                await examQuestionTypeRelationsSchema.create({
                    exam_id: bodyData?.id,
                    question_type_id: data?.question_type_id,
                    total_questions: data?.total_questions
                });
            });
        }

        return updateExam;
    }

    // Delete exams
    async deleteExams(id) {
        let idCheck = await examsSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            }
        });
        if (!idCheck) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
            };
        }

        await examQuestionTypeRelationsSchema.destroy({
            where: {
                exam_id: id
            }
        });

        return await examsSchema.update({
            isDelete: STATUS.DELETED
        },
            {
                where: {
                    id: id
                }
            });
    }

    // Get exams by id
    async getExamsByID(id) {

        let getIdData = await examsSchema.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            },
            include: [
                {
                    model: usersSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                },
                {
                    model: subjectsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                },
                {
                    model: standardSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                },
                {
                    model: questionsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                    include: [
                        {
                            model: optionsSchema,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                        }
                    ],
                },
                {
                    model: examTypesSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                },
                {
                    model: examQuestionTypeRelationsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                    include: [
                        {
                            model: questionTypeSchema,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                        }
                    ]
                },
            ],
            order: [
                [{ model: questionsSchema }, 'sortOrder', 'ASC'],
                [{ model: questionsSchema }, { model: optionsSchema }, 'sortOrder', 'ASC']
            ]
        });
        if (!getIdData) {
            return { status: STATUS_CODES.NOT_FOUND }
        }
        return getIdData
    }

    // Get all exams
    async getAllExamsList(bodyData) {
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
            sortBy = [['id', 'asc']];
        }
        var filterQuery = {};
        var subjectQuery = {};
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

        let examCount = await examsSchema.findAndCountAll({
            where: {
                isDelete: STATUS.NOTDELETED,
            }
        });


        let examData = await examsSchema.findAll({
            where: {
                ...filterQuery,
                isDelete: STATUS.NOTDELETED
            },
            include: [
                {
                    model: usersSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                },
                {
                    model: subjectsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                    where: {
                        ...subjectQuery
                    }
                },
                {
                    model: standardSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                },
                {
                    model: examTypesSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                },
                {
                    model: questionsSchema,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] },
                    include: [
                        {
                            model: optionsSchema,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'isDelete'] }
                        }
                    ]
                },

            ],
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
        });
        return {
            count: examCount?.count,
            rows: examData,
        };
    }
}

module.exports = examModel;