'use strict';

const { STATUS } = require("../../config/constant");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_otp_verifications', {
      id: {
        allowNull       : false,
        autoIncrement   : true,
        primaryKey      : true,
        type            : Sequelize.BIGINT(20).UNSIGNED
      },
      otp: {
        allowNull       : false,
        type            : Sequelize.STRING(255),
      },
      student_id:{
        allowNull       : false,
        type            : Sequelize.BIGINT(20).UNSIGNED,
        references      : { model: 'students', key: 'id' },
        onDelete: 'CASCADE',
      },
      expireAt: {
        allowNull       : false,
        type            : Sequelize.DATE
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
      await queryInterface.dropTable('student_otp_verifications');
  }
};
