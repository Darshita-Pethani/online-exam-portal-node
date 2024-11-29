const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const examTypesController = new (require('../Controllers/exam_types'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add exam type
router.route('/add').post(userAuth, examTypesController.addExamType);

// Update exam type
router.route('/update').put(userAuth, examTypesController.updateExamType);

// Get all exam type list
router.route('/list').post(userAuth, examTypesController.getExamTypeList);

// Get exam type by id
router.route('/:id').get(userAuth, examTypesController.getExamTypeById);

// Delete exam type
router.route('/delete/:id').delete(userAuth, examTypesController.deleteExamType);


module.exports = router