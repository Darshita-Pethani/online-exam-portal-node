const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const examController = new (require('../Controllers/exams'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add exam
router.route('/add').post(userAuth,examController.addExams);

// Update exam
router.route('/update').put(userAuth,examController.updateExams);

// Delete exam
router.route('/delete/:id').delete(userAuth,examController.deleteExams);

// Get exam by id
router.route('/:id').get(userAuth,examController.getExamByID);

// Get all exams
router.route('/list').post(userAuth,examController.getAllExamsList);

module.exports = router