'use strict';

const { MODULES, STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {

    let ModuleList = [];
    let count = 0;
    Object.keys(MODULES).forEach(index => {
      count = (count + 1);
      ModuleList.push({
        id: count,
        name: MODULES[index],
        status: STATUS.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });
    await queryInterface.bulkInsert('modules', ModuleList, {});
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('modules', null, {});
  }
};
