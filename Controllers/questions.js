const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../config/constant');

const questionsModel = new (require('../Models/questions'))();

class questionsController {

    // Add questions
    async addQuestions(req, res) {
        try {
            let data = await questionsModel.addQuestions(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.QUESTION.EXIST);
                return;
            }
            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXAM.NOT_AVAILABLE);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.QUESTION.ADDED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update questions
    async updateQuestions(req, res) {
        try {
            let data = await questionsModel.updateQuestions(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_ACCEPTABLE) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION);
                return;
            }
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.QUESTION.EXIST);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.QUESTION.UPDATED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Delete questions
    async deleteQuestions(req, res) {
        try {
            let data = await questionsModel.deleteQuestions(req?.params?.id);
            if (data.status == STATUS_CODES.NOT_ACCEPTABLE) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.QUESTION.DELETED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Get questions by id
    async getQuestionsByID(req, res) {
        try {
            let data = await questionsModel.getQuestionsByID(req?.params?.id);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION);
                return;
            }
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Get all questions
    async getAllQuestionsList(req, res) {
        try {
            let data = await questionsModel.getAllQuestionsList(req?.body);
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update option sort order
    async updateOptionSortOrder(req, res) {
        try {
            let data = await questionsModel.updateOptionSortOrder(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_ACCEPTABLE) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION);
                return;
            }
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.QUESTION.EXIST);
                return;
            }
            res.handler.success(data, 'Sort order updated successfully');
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update question sort order
    async updateQuestionSortOrder(req, res) {
        try {
            let data = await questionsModel.updateQuestionSortOrder(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_ACCEPTABLE) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION);
                return;
            }
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.QUESTION.EXIST);
                return;
            }
            res.handler.success(data, 'Sort order updated successfully');
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = questionsController;