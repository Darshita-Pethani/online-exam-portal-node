'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const results = [
      {
        user_id: 2,
        exam_id: 1,
        total_marks: 10,
        exam_id: 1,
        standard_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        exam_id: 3,
        total_marks: 50,
        exam_id: 1,
        standard_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = results.map(async (user) => {
      return queryInterface.bulkInsert('results', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('results', null, {});
  }
};