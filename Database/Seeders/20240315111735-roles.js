'use strict';

const { ROLE_TYPES, STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {

    let RoleList = [];
    let count = 0;
    Object.keys(ROLE_TYPES).forEach(index => {
      count = (count + 1);
      RoleList.push({
        id: count,
        name: ROLE_TYPES[index],
        status: STATUS.ACTIVE,
        isDefault: STATUS.DEFAULT,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });
    await queryInterface.bulkInsert('roles', RoleList, {});
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('roles', null, {});
  }
};
