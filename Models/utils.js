const { STATUS_CODES, STATUS } = require("../config/constant");
const { sequelize } = require("../Database/Schema");


class utilsModel {

    // Update status
    async updateStatus(bodyData) {
        if ((bodyData?.tableName === 'users') && bodyData?.status === STATUS.INACTIVE) {
            let table, columnName;
            if (bodyData?.tableName === 'users') {
                table = "user_tokens"
                columnName = "user_id"
            }
            await sequelize.query(`DELETE FROM ${table} WHERE ${columnName}='${bodyData?.id}';`);
        };

        return await sequelize.query(`
        UPDATE 
            ${bodyData?.tableName} 
        SET 
            status = ${bodyData?.status} 
        WHERE 
            id = ${bodyData?.id}
    `);
    };
};

module.exports = utilsModel;