'use strict';

const { QUESTION_TYPES, STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {

    let QuestionTypesList = [];
    let count = 0;
    Object.keys(QUESTION_TYPES).forEach(index => {
      count = (count + 1);
      QuestionTypesList.push({
        id: count,
        name: QUESTION_TYPES[index],
        status: STATUS.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });
    await queryInterface.bulkInsert('question_types', QuestionTypesList, {});
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('question_types', null, {});
  }
};
