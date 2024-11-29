const router = (require('express')).Router()

const Authentication = new (require("../Middleware/authentication"));
const roleController = new (require('../Controllers/roles'));
const FileManager = new (require("../Utils/file_manager"));
const userAuth = Authentication.userAuth;

// Add role
router.route('/add').post(userAuth, roleController.addRole);

// Update role
router.route('/update').put(userAuth, roleController.updateRole);

// Get all role list
router.route('/list').post(userAuth, roleController.getRolesList);

// Get role by id
router.route('/:id').get(userAuth, roleController.getRoleById);

// Delete role
router.route('/delete/:id').delete(userAuth, roleController.deleteRole);


module.exports = router