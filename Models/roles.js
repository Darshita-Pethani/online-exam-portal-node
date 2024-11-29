const { STATUS, STATUS_CODES, STATUS_MESSAGES } = require("../config/constant");
const {
    roles: roleSchema,
    modules: moduleSchema,
    permissions: permissionSchema,
} = require("../Database/Schema");

class roleModel {

    // Add role
    async addRole(data) {
        let checkRole = await roleSchema.findOne({
            where: {
                name: data?.name,
            }
        });

        if (checkRole) {
            return { status: STATUS_CODES.ALREADY_REPORTED }
        };

        let insertData = await roleSchema.create(data);

        await this.addUpdatePermissions(data, insertData?.id);

        return insertData;
    };

    // Get role list
    async getRolesList(bodyData) {
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

        let rolesCount = await roleSchema.findAndCountAll({
            where: {
                isDelete: STATUS.NOTDELETED,
            }
        });

        let role = await roleSchema.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
                isDelete: STATUS.NOTDELETED,
                ...filterQuery,
            },
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
            include: {
                model: permissionSchema,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: {
                    model: moduleSchema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            },
        });

        return {
            count: rolesCount?.count,
            rows: role,
        };
    };

    // Update role
    async updateRole(bodyData) {
        let role = await roleSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!role) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        let checkRole = await roleSchema.findOne({
            where: {
                id: { [SEQUELIZE.Op.not]: bodyData?.id },
                name: bodyData?.name,
            }
        });

        if (checkRole) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            };
        };

        let updateRoleData = await roleSchema.update(bodyData, {
            where: { id: bodyData?.id },
        });

        await this.addUpdatePermissions(bodyData, bodyData?.id);

        return updateRoleData;
    };

    async addUpdatePermissions(data, role_id) {

        //  Removed dashboasrdcpermission from here 

        if (data?.permissions !== null && data?.permissions?.length > 0) {
            data?.permissions?.map(async (permission_data) => {
                const permissionData = await permissionSchema.findOne({
                    where: {
                        role_id: role_id,
                        module_id: permission_data?.module_id
                    }
                });
                if (permissionData) {
                    return await permissionSchema.update(permission_data, {
                        where: {
                            module_id: permission_data?.module_id,
                            role_id: role_id,
                        },
                    });
                } else {
                    permission_data.role_id = role_id
                    return await permissionSchema.create(permission_data);
                }
            });
        };
    };

    // Delete role
    async deleteRole(bodyData) {
        let role = await roleSchema.findOne({
            where: {
                id: bodyData?.id,
                isDelete: STATUS.NOTDELETED
            },
        });

        if (!role) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        await permissionSchema.destroy({
            where: {
                role_id: bodyData?.id,
            }
        })

        return await roleSchema.update({ isDelete: STATUS.DELETED }, {
            where: { id: bodyData?.id },
        });
    };

    // Get role by id
    async getRoleById(id) {
        let roleData = await roleSchema.findOne({
            where: {
                id: id,
                isDelete: STATUS.NOTDELETED
            },
            include: {
                model: permissionSchema,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: {
                    model: moduleSchema,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                }
            },
        });

        if (!roleData) {
            return {
                status: STATUS_CODES.NOT_FOUND,
            };
        };

        return roleData;
    };

};

module.exports = roleModel;
