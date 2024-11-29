'use strict';

const { STATUS } = require("../../config/constant");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_otp_verifications', {
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
      user_id:{
        allowNull       : false,
        type            : Sequelize.BIGINT(20).UNSIGNED,
        references      : { model: 'users', key: 'id' },
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
      await queryInterface.dropTable('user_otp_verifications');
  }
};
