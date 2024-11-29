const { STATUS, STATUS_CODES, STATUS_MESSAGES } = require("../config/constant");
const {
    standards: standardSchema,
    standard_user_relations: standardUserRelationSchema,
    users: usersSchema,
} = require("../Database/Schema");

class standardModel {

    // Add standard
    async addStandard(data) {
        let checkStandard = await standardSchema.findOne({
            where: {
                name: data?.name,
            }
        });

        if (checkStandard) {
            return { status: STATUS_CODES.ALREADY_REPORTED }
        };

        return await standardSchema.create(data);

    };

    // Update standard
    async updateStandard(bodyData) {
        let standard = await standardSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!standard) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        let checkStandard = await standardSchema.findOne({
            where: {
                id: { [SEQUELIZE.Op.not]: bodyData?.id },
                name: bodyData?.name,
            }
        });

        if (checkStandard) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            };
        };

        let updateStandardData = await standardSchema.update(bodyData, {
            where: { id: bodyData?.id },
        });

        return updateStandardData;
    };

    // Delete standard
    async deleteStandard(bodyData) {
        let standard = await standardSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!standard) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        return await standardSchema.update({ isDelete: STATUS.DELETED }, {
            where: { id: bodyData?.id },
        });
    };

    // Get standard by id
    async getStandardById(id) {
        let standardData = await standardSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            },
            include: [{
                model: standardUserRelationSchema,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [{
                    model: usersSchema,
                    attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                }],
            }],
        });

        if (!standardData) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        return standardData;
    };

    // Get standard list
    async getStandardList(bodyData) {
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

        return await standardSchema.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
                isDelete: STATUS.NOTDELETED,
                ...filterQuery,
            },
            // include: [{
            //     model: standardUserRelationSchema,
            //     attributes: { exclude: ["createdAt", "updatedAt"] },
            //     include: [{
            //         model: usersSchema,
            //         attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            //     }],
            // }],
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy]
        });
    };

};

module.exports = standardModel;
