const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../config/constant');

const resultsModel = new (require('../Models/results'))();

class resultsController {

    // Get results by id
    async getResult(req, res) {
        try {
            let data = await resultsModel.getResult(req?.userInfo);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.RESULT);
                return;
            }
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Get all results
    async getAllResultsList(req, res) {
        try {
            let data = await resultsModel.getAllResultsList(req?.body);
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = resultsController;