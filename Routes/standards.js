const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const standardController = new (require('../Controllers/standards.js'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add standard
router.route('/add').post(userAuth, standardController.addStandard);

// Update standard
router.route('/update').put(userAuth, standardController.updateStandard);

// Delete standard
router.route('/delete/:id').delete(userAuth, standardController.deleteStandard);

// Get standard by id
router.route('/:id').get(userAuth, standardController.getStandardById);

// Get all standard list
router.route('/list').post(userAuth, standardController.getStandardList);

module.exports = router