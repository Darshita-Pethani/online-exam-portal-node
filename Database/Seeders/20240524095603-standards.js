'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const standards = [
      {
        name: '5th',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '6th',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '7th',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '8th',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '9th',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = standards.map(async (user) => {
      return queryInterface.bulkInsert('standards', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('standards', null, {});
  }
};