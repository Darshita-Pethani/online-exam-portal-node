const { STATUS, STATUS_CODES, STATUS_MESSAGES } = require("../config/constant");
const {
    question_types: questionTypesSchema,
} = require("../Database/Schema");

class QuestionTypesModel {

    // Add exam type
    async addQuestionType(data) {
        let checkQuestionType = await questionTypesSchema.findOne({
            where: {
                name: data?.name,
                isDelete: STATUS.NOTDELETED
            }
        });

        if (checkQuestionType) {
            return { status: STATUS_CODES.ALREADY_REPORTED }
        };

        let insertData = await questionTypesSchema.create(data);

        return insertData;
    };

    // Get exam_type list
    async getQuestionTypeList(bodyData) {
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

        let questionTypeCount = await questionTypesSchema.findAndCountAll({
            where: {
                isDelete: STATUS.NOTDELETED,
            }
        });

        let questionType = await questionTypesSchema.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
                isDelete: STATUS.NOTDELETED,
                ...filterQuery,
            },
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy]
        });

        return {
            count: questionTypeCount?.count,
            rows: questionType,
        };
    };

    // Update exam type
    async updateQuestionType(bodyData) {
        let questionType = await questionTypesSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!questionType) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        let checkQuestionType = await questionTypesSchema.findOne({
            where: {
                id: { [SEQUELIZE.Op.not]: bodyData?.id },
                name: bodyData?.name,
            }
        });

        if (checkQuestionType) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            };
        };

        let updateQuestionTypeData = await questionTypesSchema.update(bodyData, {
            where: { id: bodyData?.id },
        });


        return updateQuestionTypeData;
    };


    // Delete exam type
    async deleteQuestionType(bodyData) {
        let questionType = await questionTypesSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!questionType) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };


        return await questionTypesSchema.update({ isDelete: STATUS.DELETED }, {
            where: { id: bodyData?.id },
        });
    };

    // Get exam type by id
    async getQuestionTypeById(id) {
        let questionTypeData = await questionTypesSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!questionTypeData) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        return questionTypeData;
    };

};

module.exports = QuestionTypesModel;
