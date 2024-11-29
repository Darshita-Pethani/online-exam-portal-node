const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const questionTypesController = new (require('../Controllers/question_types'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add question type
router.route('/add').post(userAuth, questionTypesController.addQuestionType);

// Update question type
router.route('/update').put(userAuth, questionTypesController.updateQuestionType);

// Get all question type list
router.route('/list').post(userAuth, questionTypesController.getQuestionTypeList);

// Get question type by id
router.route('/:id').get(userAuth, questionTypesController.getQuestionTypeById);

// Delete question type
router.route('/delete/:id').delete(userAuth, questionTypesController.deleteQuestionType);


module.exports = router