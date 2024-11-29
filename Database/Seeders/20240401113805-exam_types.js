'use strict';

const { EXAM_TYPES, STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {

    let ExamList = [];
    let count = 0;
    Object.keys(EXAM_TYPES).forEach(index => {
      count = (count + 1);
      ExamList.push({
        id: count,
        name: EXAM_TYPES[index],
        status: STATUS.ACTIVE,
        isDefault: STATUS.DEFAULT,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });
    await queryInterface.bulkInsert('exam_types', ExamList, {});
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('exam_types', null, {});
  }
};
