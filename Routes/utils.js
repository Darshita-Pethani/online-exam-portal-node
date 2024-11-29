const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const utilsController = new (require('../Controllers/utils'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Update Status
router.route('/update/status').post(userAuth, utilsController.updateStatus);



module.exports = router