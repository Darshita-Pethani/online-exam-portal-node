'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_tokens', {
      id: {
        allowNull       : false,
        autoIncrement   : true,
        primaryKey      : true,
        type            : Sequelize.BIGINT(20).UNSIGNED
      },
      access_token :{
        allowNull       : false,
        type            : Sequelize.STRING(255),
      },
      student_id : {
        defaultValue : 0,
        type            : Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'students', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull       : false,
        type            : Sequelize.DATE
      },
      updatedAt: {
        allowNull       : false,
        type            : Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('student_tokens');
  }
};