const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"))
const studentAuth = Authentication.studentAuth;
const studentController = new (require('../Controllers/students'))
const { IMG_FOLDER_NAME } = require("../config/constant");
const FileManager = new (require("../Utils/file_manager"))

// sign up
router.route('/sign_up').post(FileManager.userUploadImage(IMG_FOLDER_NAME.STUDENTS).single('file'), studentController.signUp);

// sign in
router.route("/sign_in").post(studentController.signIn);

// get student by id
router.route('/:id').get(studentAuth, studentController.getstudentById);

// update student profile
router.route('/update').put(studentAuth, FileManager.userUploadImage(IMG_FOLDER_NAME.STUDENTS).single('file'), studentController.updatestudentProfile);

// Delete student 
router.route('/delete/:id').delete(studentAuth, studentController.deletestudentProfile);

// student sign out
router.route('/sign_out').post(studentAuth, studentController.studentSignOut);

// change password
router.route('/change_password').post(studentAuth, studentController.changePassword);

// forgot User Password Using Otp
router.route('/forgotPassword/otp').post(studentController.forgotPasswordUsingOtp);

// Otp verification
router.route('/otp_verification').post(studentController.otpVerification);

// Reset Password Using OTP
router.route('/otp_verification/reset_password/:id').put(studentController.resetPasswordUsingOtp);

// Get student List
router.route('/list').post(studentAuth, studentController.getstudentsList);

module.exports = router