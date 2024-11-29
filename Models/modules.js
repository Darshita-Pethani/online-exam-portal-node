const mailer = new (require("../Utils/mailer"))();
const {
    modules: modulesSchema,
} = require("../Database/Schema");

class examModel {

    // Get all exams
    async getAllModulesList() {
        let moduleData = await modulesSchema.findAll({
            where: {
                isDelete: STATUS.NOTDELETED
            },
        });
        return moduleData
    }
}

module.exports = examModel;