const { STATUS, STATUS_CODES, STATUS_MESSAGES } = require("../config/constant");
const {
    exam_types: examTypesSchema,
} = require("../Database/Schema");

class ExamTypesModel {

    // Add exam type
    async addExamType(data) {
        let checkExamType = await examTypesSchema.findOne({
            where: {
                name: data?.name,
            }
        });

        if (checkExamType) {
            return { status: STATUS_CODES.ALREADY_REPORTED }
        };

        let insertData = await examTypesSchema.create(data);

        return insertData;
    };

    // Get exam_type list
    async getExamTypeList(bodyData) {
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

        let examTypeCount = await examTypesSchema.findAndCountAll({
            where: {
                isDelete: STATUS.NOTDELETED,
            }
        });

        let examType = await examTypesSchema.findAll({
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
            count: examTypeCount?.count,
            rows: examType,
        };
    };

    // Update exam type
    async updateExamType(bodyData) {
        let examType = await examTypesSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!examType) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        let checkExamType = await examTypesSchema.findOne({
            where: {
                id: { [SEQUELIZE.Op.not]: bodyData?.id },
                name: bodyData?.name,
            }
        });

        if (checkExamType) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            };
        };

        let updateExamTypeData = await examTypesSchema.update(bodyData, {
            where: { id: bodyData?.id },
        });


        return updateExamTypeData;
    };

    
    // Delete exam type
    async deleteExamType(bodyData) {
        let examType = await examTypesSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!examType) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };


        return await examTypesSchema.update({ isDelete: STATUS.DELETED }, {
            where: { id: bodyData?.id },
        });
    };

    // Get exam type by id
    async getExamTypeById(id) {
        let examTypeData = await examTypesSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!examTypeData) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        return examTypeData;
    };

};

module.exports = ExamTypesModel;
