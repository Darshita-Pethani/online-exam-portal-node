const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const userExamEnrollsController = new (require('../Controllers/user_exam_enrolls'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add user exam enroll
router.route('/add').post(userAuth, userExamEnrollsController.addUserExam);

// Update user exam enroll
router.route('/update').put(userAuth, userExamEnrollsController.updateUserExam);

// Get user exam enroll by id
router.route('/:id').get(userAuth, userExamEnrollsController.getUserExamById);

// Delete user exam enroll
router.route('/delete/:id').delete(userAuth, userExamEnrollsController.deleteUserExam);

// Get list of user exam enroll
router.route('/list').post(userAuth, userExamEnrollsController.getAllUserExam);

//  Get user exam by exam id
router.route('/getDataByexamId/list').post(userAuth, userExamEnrollsController.getUserExamByExamId);

module.exports = router