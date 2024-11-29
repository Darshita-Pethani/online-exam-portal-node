const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../config/constant');

const userExamEnrollsModel = new (require('../Models/user_exam_enrolls'))();

class userExamEnrollsController {

    // Add user exam
    async addUserExam(req, res) {
        try {
            let data = await userExamEnrollsModel.addUserExam(req?.body, req?.userInfo);

            if (data.status == STATUS_CODES.NOT_ACCEPTABLE) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.USER_ENROLL);
                return;
            }

            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.EXISTS.USER_NOT_ALLOWED);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.USER_EXAM_ENROLL.ADDED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //  Update user exam
    async updateUserExam(req, res) {
        try {
            let data = await userExamEnrollsModel.updateUserExam(req?.body, req?.userInfo);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.USER_EXAM_ENROLL.NOT_FOUND);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.USER_EXAM_ENROLL.UPDATED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //  Get user exam by id
    async getUserExamById(req, res) {
        try {
            let data = await userExamEnrollsModel.getUserExamById(req.params.id);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.USER_EXAM_ENROLL.NOT_FOUND);
                return;
            }
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //  Delete user exam 
    async deleteUserExam(req, res) {
        try {
            let data = await userExamEnrollsModel.deleteUserExam(req.params.id);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.USER_EXAM_ENROLL.NOT_FOUND);
                return;
            }
            res.handler.success(data, STATUS_MESSAGES.USER_EXAM_ENROLL.DELETED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //  Get list of all user exam 
    async getAllUserExam(req, res) {
        try {
            let data = await userExamEnrollsModel.getAllUserExam(req?.body, req?.userInfo);

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //  Get user exam by exam id
    async getUserExamByExamId(req, res) {
        try {
            let data = await userExamEnrollsModel.getUserExamByExamId(req?.body);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.USER_EXAM_ENROLL.NOT_FOUND);
                return;
            }
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

}



module.exports = userExamEnrollsController;

