const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../config/constant');

const examModel = new (require('../Models/exams'))();

class examController {

    // Add exams
    async addExams(req, res) {
        try {
            let data = await examModel.addExams(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.EXAM);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.EXAM.ADDED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update exams
    async updateExams(req, res) {
        try {
            let data = await examModel.updateExams(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.EXAM);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.EXAM.UPDATED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Delete exams
    async deleteExams(req, res) {
        try {
            let data = await examModel.deleteExams(req?.params?.id);
            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.EXAM);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.EXAM.DELETED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Get exam by id
    async getExamByID(req, res) {
        try {
            let data = await examModel.getExamsByID(req?.params?.id);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.EXAM);
                return;
            }
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Get all exam
    async getAllExamsList(req, res) {
        try {
            let data = await examModel.getAllExamsList(req?.body);
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = examController;