const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const resultController = new (require('../Controllers/results'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Get result by id
router.route('/getresult').get(userAuth, resultController.getResult);

// Get all result
router.route('/list').post(userAuth,resultController.getAllResultsList);

module.exports = router