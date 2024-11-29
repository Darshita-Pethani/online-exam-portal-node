const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const subjectController = new (require('../Controllers/subjects'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add subject
router.route('/add').post(userAuth, subjectController.addSubject);

// Update subject
router.route('/update').put(userAuth, subjectController.updateSubject);

// Delete subject
router.route('/delete/:id').delete(userAuth, subjectController.deleteSubject);

// Get subject by id
router.route('/:id').get(userAuth, subjectController.getSubjectByID);

// Get all subjects
router.route('/list').post(userAuth, subjectController.getAllSubjectList);

module.exports = router