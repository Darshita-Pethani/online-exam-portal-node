const { STATUS_CODES, STATUS_MESSAGES } = require('../config/constant');

const ExamTypeModel = new (require('../Models/exam_types'))();

class ExamTypeController {

    //Add exam type
    async addExamType(req, res) {
        try {
            let data = await ExamTypeModel.addExamType(req?.body);

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.EXAM_TYPE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.EXAM_TYPE.EXAM_TYPE_ADD);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get exam type list
    async getExamTypeList(req, res) {
        try {
            let data = await ExamTypeModel.getExamTypeList(req?.body);

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Update exam type
    async updateExamType(req, res) {
        try {
            let data = await ExamTypeModel.updateExamType(req?.body);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.EXAM_TYPE);
                return;
            };

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.EXAM_TYPE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.EXAM_TYPE.EXAM_TYPE_UPDATE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Delete exam type
    async deleteExamType(req, res) {
        try {
            let data = await ExamTypeModel.deleteExamType(req?.params);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.EXAM_TYPE);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.EXAM_TYPE.EXAM_TYPE_DELETE);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

    // Get exam type by id
    async getExamTypeById(req, res) {
        try {
            let data = await ExamTypeModel.getExamTypeById(req?.params?.id);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.EXAM_TYPE);
                return;
            };

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };

};

module.exports = ExamTypeController;