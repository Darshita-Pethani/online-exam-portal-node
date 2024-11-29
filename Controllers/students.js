const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../config/constant');

const studentModel = new (require('../Models/students'))();

class studentController {

    // sign up
    async signUp(req, res) {
        try {
            let data = await studentModel.signUp(req?.body, req?.body?.file);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.EMAIL);
                return;
            }

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
                return;
            }

            res.handler.success(undefined, STATUS_MESSAGES.REGISTER_SUCCESS);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // sign in
    async signIn(req, res) {
        try {
            let data = await studentModel.signIn(req?.body);

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data.message);
                return;
            }

            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, data.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.LOGIN_SUCCESS);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // get student by id
    async getstudentById(req, res) {
        try {
            let data = await studentModel.getstudentById(req?.params?.id);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.STUDENT.NOT_AVAILABLE);
                return;
            }
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //Update student Profile
    async updatestudentProfile(req, res) {
        try {
            let data = await studentModel.updatestudentProfile(req?.body, req?.body?.file);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.STUDENT.NOT_AVAILABLE);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.USER.PROFILE_UPDATED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //Delete student Profile
    async deletestudentProfile(req, res) {
        try {
            let data = await studentModel.deletestudentProfile(req?.params?.id);
            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.STUDENT.NOT_AVAILABLE);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.USER.PROFILE_DELETED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // student sign out
    async studentSignOut(req, res) {
        try {
            let data = await studentModel.studentSignOut(req.studentInfo, req.headers)

            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
                return;
            }

            res.handler.success(undefined, STATUS_MESSAGES.TOKEN.LOGOUT);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //Change Password
    async changePassword(req, res) {
        try {
            let data = await studentModel.changePassword(req.body, req.studentInfo);

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data.message);
                return;
            }

            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, data.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.PASSWORD.CHANGED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Forgot User Password Using Otp
    async forgotPasswordUsingOtp(req, res) {
        try {
            let data = await studentModel.forgotPasswordUsingOtp(req?.body);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.EMAIL);
                return;
            }

            res.handler.success(undefined, STATUS_MESSAGES.PROCESS.EMAIL_SENT);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // OTP Verification
    async otpVerification(req, res) {
        try {

            let data = await studentModel.otpVerification(req?.body);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.OTP.INVALID);
                return;
            }

            if (data.status == STATUS_CODES.NOT_ACCEPTABLE) {
                res.handler.notFound(undefined, STATUS_MESSAGES.OTP.EXPIRE);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.OTP.CORRECT);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Reset User Password Using OTP
    async resetPasswordUsingOtp(req, res) {
        try {

            let data = await studentModel.resetPasswordUsingOtp(req?.body, req?.params?.id);

            if (data.status == STATUS_CODES.VALIDATION_ERROR) {
                res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
                return;
            }

            if (data.status == STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.ACCOUNT);
                return;
            }

            if (data.status == STATUS_CODES.SUCCESS) {
                res.handler.success(undefined, STATUS_MESSAGES.PASSWORD.CHANGED);
                return;
            }

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Get all students list
    async getstudentsList(req, res) {
        try {
            let data = await studentModel.getstudentsList(req?.body);
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOTIFICATIONS.NOT_FOUND);
                return;
            }
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = studentController;