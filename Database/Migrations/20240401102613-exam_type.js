'use strict';

const { STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exam_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.ACTIVE,
        comment: "0 => Inactive, 1 => Active"
      },
      isDefault: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.NOT_DEFAULT,
      },
      sortOrder: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.NOTDELETED,
        comment: "0 => Not deleted 1 => Deleted"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('exam_types');
  }
};