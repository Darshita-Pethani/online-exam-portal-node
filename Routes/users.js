const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"))
const userAuth = Authentication.userAuth;
const userController = new (require('../Controllers/users'))
const { IMG_FOLDER_NAME } = require("../config/constant");
const FileManager = new (require("../Utils/file_manager"))

// add user
router.route('/add').post(userAuth,FileManager.userUploadImage(IMG_FOLDER_NAME.USERS).single('file'), userController.addUser);

// sign in
router.route("/sign_in").post(userController.signIn);

// get user by id
router.route('/:id').get(userAuth, userController.getuserById);

// update user profile
router.route('/update').put(userAuth,FileManager.userUploadImage(IMG_FOLDER_NAME.USERS).single('file'), userController.updateUserProfile);

// user sign out
router.route('/sign_out').post(userAuth, userController.userSignOut);

// change password
router.route('/change_password').post(userAuth, userController.changePassword);

// forgot password
router.route('/forgot_password').post(userController.forgotPassword);

// reset password
router.route('/reset_password').post(userController.resetPassword);

// forgot User Password Using Otp
router.route('/forgotPassword/otp').post(userController.forgotPasswordUsingOtp);

// Otp verification
router.route('/otp_verification').post(userController.otpVerification);

// Reset Password Using OTP
router.route('/otp_verification/reset_password/:id').put(userController.resetPasswordUsingOtp);

// User List
router.route('/list').post(userAuth, userController.getusersList);

// Delete user
router.route('/delete/:id').delete(userAuth, userController.deleteUser);

module.exports = router