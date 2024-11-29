const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../config/constant');

const subjectModel = new (require('../Models/subjects'))();

class subjectController {

    // Add subjects
    async addSubject(req, res) {
        try {
            let data = await subjectModel.addSubject(req?.body,req?.userInfo);
            res.handler.success(data, STATUS_MESSAGES.SUBJECT.ADDED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update subjects
    async updateSubject(req, res) {
        try {
            let data = await subjectModel.updateSubject(req?.body,req?.userInfo);
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.SUBJECT);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.SUBJECT.UPDATED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Delete subjects
    async deleteSubject(req, res) {
        try {
            let data = await subjectModel.deleteSubject(req?.params?.id);
            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.SUBJECT);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.SUBJECT.DELETED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Get subject by id
    async getSubjectByID(req, res) {
        try {
            let data = await subjectModel.getSubjectByID(req?.params?.id);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.SUBJECT);
                return;
            }
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Get all subject
    async getAllSubjectList(req, res) {
        try {
            let data = await subjectModel.getAllSubjectList(req?.body);
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = subjectController;