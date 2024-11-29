var jwt = require('jsonwebtoken');
// const adminModel = new (require('../Models/admins'))();
const userModel = new (require('../Models/users'))();
const studentModel = new (require('../Models/students'))();

class Authentication {
    constructor() {
        this.userAuth = this.userAuth.bind(this);
        this.studentAuth = this.studentAuth.bind(this);
        this.checkAccess = this.checkAccess.bind(this);
    }

    // user auth
    async userAuth(req, res, next) {
        let authToken = req.headers.authorization;
        if (!authToken) {
            res.handler.validationError(undefined, STATUS_MESSAGES.TOKEN.INVALID);
            return false
        }

        const userToken = await userModel.getuserTokenInfo(authToken);

        if (!userToken) {
            res.handler.unauthorized();
            return;
        }

        req.userInfo = userToken ? userToken.user ? userToken.user['dataValues'] : null : null;
        next();
    }


     // student auth
     async studentAuth(req, res, next) {
        let authToken = req.headers.authorization;
        if (!authToken) {
            res.handler.validationError(undefined, STATUS_MESSAGES.TOKEN.INVALID);
            return false
        }

        const studentToken = await studentModel.getStudentTokenInfo(authToken);

        if (!studentToken) {
            res.handler.unauthorized();
            return;
        }

        req.studentInfo = studentToken ? studentToken.student ? studentToken.student['dataValues'] : null : null;
        next();
    }

    checkAccess(currentModule, access, options = {}) {
        let { exception, key, value } = options;
        return async function (req, res, next) {

            let authToken = req.headers.authorization;

            if (!authToken) return res.handler.validationError(undefined, STATUS_MESSAGES.TOKEN.INVALID);

            const adminToken = await adminModel.getAdminTokenInfo(authToken);

            if (!adminToken) return res.handler.unauthorized();

            const admin = await adminModel.getAdminById(adminToken['admin_id'])

            if (!admin) return res.handler.unauthorized(undefined, STATUS_MESSAGES.NOT_FOUND.ADMIN);

            /* 
                CHECK MODULE ACCESS
            */
            let plainAdmin = admin.get({ plain: true }),
                hasAccess = !currentModule ? true : false,
                { modules } = plainAdmin.role

            if (currentModule)
                modules.forEach(module => {
                    if (module.name === currentModule)
                        hasAccess = module.permissions[access]
                });

            if (exception && value.includes(req.body[key])) hasAccess = true;

            if (!hasAccess)
                return res.handler.forbidden()

            req.adminInfo = admin['dataValues'];
            next();
        }.bind(this)

    }
}
module.exports = Authentication;