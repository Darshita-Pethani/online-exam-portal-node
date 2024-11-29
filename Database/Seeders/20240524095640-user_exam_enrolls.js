'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const user_exam_enrolls = [
      {
        user_id: 2,
        exam_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = user_exam_enrolls.map(async (user) => {
      return queryInterface.bulkInsert('user_exam_enrolls', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('user_exam_enrolls', null, {});
  }
};