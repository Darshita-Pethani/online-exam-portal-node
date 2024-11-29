const { STATUS_CODES, STATUS_MESSAGES, ROLE_TYPES_ID } = require('../Config/constant');

const userModel = new (require('../Models/users'))();

class userController {

    // add user
    async addUser(req, res) {
        try {
            let data = await userModel.addUser(req?.userInfo, req?.body, req?.body?.file);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.EMAIL);
                return;
            }

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
                return;
            }

            res.handler.success(undefined, STATUS_MESSAGES.USER.ADDED);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // sign in
    async signIn(req, res) {
        try {
            let data = await userModel.signIn(req?.body);

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

    // get user by id
    async getuserById(req, res) {
        try {
            let data = await userModel.getuserById(req?.params?.id);
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //Update user Profile
    async updateUserProfile(req, res) {
        try {
            let data = await userModel.updateUserProfile(req?.userInfo, req?.body, req?.body?.file);
            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.USER.PROFILE_UPDATED);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // user sign out
    async userSignOut(req, res) {
        try {
            let data = await userModel.userSignOut(req.userInfo, req.headers)

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
            let data = await userModel.changePassword(req.body, req.userInfo);

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

    // Forgot Password
    async forgotPassword(req, res) {
        try {
            let data = await userModel.forgotPassword(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, data.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.PROCESS.EMAIL_SENT);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    //Reset Password
    async resetPassword(req, res) {
        try {
            let data = await userModel.resetPassword(req);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, data.message);
                return;
            }

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data.message);
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
            let data = await userModel.forgotPasswordUsingOtp(req?.body);

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

            let data = await userModel.otpVerification(req?.body);

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

            let data = await userModel.resetPasswordUsingOtp(req?.body, req?.params?.id);

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

    // Get all users list
    async getusersList(req, res) {
        try {
            let data = await userModel.getusersList(req?.userInfo, req?.body);
            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, STATUS_MESSAGES.NOTIFICATIONS.NOT_FOUND);
                return;
            }
            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Delete User
    async deleteUser(req, res) {
        try {
            let data = await userModel.deleteUser(req?.params);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
                return;
            };

            res.handler.success(data, STATUS_MESSAGES.USER.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        };
    };
}

module.exports = userController;