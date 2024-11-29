const { STATUS_CODES, STATUS_MESSAGES } = require('../config/constant');

const QuestionTypeModel = new (require('../Models/question_types'))();

class QuestionTypeController {

    //Add question type
    async addQuestionType(req, res) {
        try {
            let data = await QuestionTypeModel.addQuestionType(req?.body);

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.QUESTION_TYPE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.QUESTION_TYPE.QUESTION_TYPE_ADD);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get question type list
    async getQuestionTypeList(req, res) {
        try {
            let data = await QuestionTypeModel.getQuestionTypeList(req?.body);

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Update question type
    async updateQuestionType(req, res) {
        try {
            let data = await QuestionTypeModel.updateQuestionType(req?.body);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION_TYPE);
                return;
            };

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.QUESTION_TYPE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.QUESTION_TYPE.QUESTION_TYPE_UPDATE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Delete question type
    async deleteQuestionType(req, res) {
        try {
            let data = await QuestionTypeModel.deleteQuestionType(req?.params);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION_TYPE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.QUESTION_TYPE.QUESTION_TYPE_DELETE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get question type by id
    async getQuestionTypeById(req, res) {
        try {
            let data = await QuestionTypeModel.getQuestionTypeById(req?.params?.id);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.QUESTION_TYPE);
                return;
            };

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

};

module.exports = QuestionTypeController;