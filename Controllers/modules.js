const moduleModel = new (require('../Models/modules'))();

class moduleController {

    // Get all module
    async getAllModulesList(req, res) {
        try {
            let data = await moduleModel.getAllModulesList(req?.body);
            res.handler.success(data)
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = moduleController;