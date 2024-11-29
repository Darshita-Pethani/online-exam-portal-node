'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const subjects = [
      {
        user_id: 3,
        name: 'PHP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        name: 'Javascript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        name: 'Data structure',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        name: 'OOPS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        name: 'Java',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = subjects.map(async (user) => {
      return queryInterface.bulkInsert('subjects', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('subjects', null, {});
  }
};