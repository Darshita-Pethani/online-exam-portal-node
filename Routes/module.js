const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));

const moduleController= new (require('../Controllers/modules'))
const userAuth = Authentication.userAuth;

// Get all modules
router.route('/list').get(userAuth,moduleController.getAllModulesList);

module.exports = router