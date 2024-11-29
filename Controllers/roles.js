const { STATUS_CODES, STATUS_MESSAGES } = require('../config/constant');

const roleModel = new (require('../Models/roles'))();

class roleController {

    //Add role
    async addRole(req, res) {
        try {
            let data = await roleModel.addRole(req?.body);

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.ROLE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.ROLE.ROLE_ADD);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get role list
    async getRolesList(req, res) {
        try {
            let data = await roleModel.getRolesList(req?.body);

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Update role
    async updateRole(req, res) {
        try {
            let data = await roleModel.updateRole(req?.body);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.ROLE);
                return;
            };

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.ROLE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.ROLE.ROLE_UPDATE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Delete role
    async deleteRole(req, res) {
        try {
            let data = await roleModel.deleteRole(req?.params);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ROLE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.ROLE.ROLE_DELETE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get role by id
    async getRoleById(req, res) {
        try {
            let data = await roleModel.getRoleById(req?.params?.id);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.ROLE);
                return;
            };

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

};

module.exports = roleController;