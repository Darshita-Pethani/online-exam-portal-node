const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const questionsController = new (require('../Controllers/questions'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add questions
router.route('/add').post(userAuth, questionsController.addQuestions);

// Update questions
router.route('/update').put(userAuth, questionsController.updateQuestions);

// Delete questions
router.route('/delete/:id').delete(userAuth, questionsController.deleteQuestions);

// Get questions by id
router.route('/:id').get(userAuth, questionsController.getQuestionsByID);

// Get all questions
router.route('/list').post(userAuth, questionsController.getAllQuestionsList);

// update options sort order
router.route('/sort/update').put(questionsController.updateOptionSortOrder);

// update question sort order
router.route('/question_sortOrder/update').put(questionsController.updateQuestionSortOrder);

module.exports = router