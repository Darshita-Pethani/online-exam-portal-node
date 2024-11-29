const { STATUS_MESSAGES } = require('../config/constant');

const utilsModel = new (require('../Models/utils'))();

class utilsController {



    // Update status
    async updateStatus(req, res) {
        try {
            let data = await utilsModel.updateStatus(req?.body);

            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        };
    };
};

module.exports = utilsController;