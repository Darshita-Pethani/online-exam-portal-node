'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const standard_user_relations = [
      {
        standard_id: 1,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        standard_id: 2,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        standard_id: 1,
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        standard_id: 3,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        standard_id: 1,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const userInsertedData = standard_user_relations.map(async (user) => {
      return queryInterface.bulkInsert('standard_user_relations', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('standard_user_relations', null, {});
  }
};