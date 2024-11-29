const { STATUS_CODES, STATUS_MESSAGES } = require('../config/constant');

const standardModel = new (require('../Models/standards.js'))();

class standardController {

    //Add standard
    async addStandard(req, res) {
        try {
            let data = await standardModel.addStandard(req?.body);

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.STANDARD);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.STANDARD.STANDARD_ADD);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Update standard
    async updateStandard(req, res) {
        try {
            let data = await standardModel.updateStandard(req?.body);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.STANDARD);
                return;
            };

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.STANDARD);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.STANDARD.STANDARD_UPDATE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Delete standard
    async deleteStandard(req, res) {
        try {
            let data = await standardModel.deleteStandard(req?.params);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.STANDARD);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.STANDARD.STANDARD_DELETE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get standard by id
    async getStandardById(req, res) {
        try {
            let data = await standardModel.getStandardById(req?.params?.id);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.STANDARD);
                return;
            };

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get standard list
    async getStandardList(req, res) {
        try {
            let data = await standardModel.getStandardList(req?.body);

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

};

module.exports = standardController;