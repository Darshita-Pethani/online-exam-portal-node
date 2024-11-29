'use strict';

const { STATUS } = require("../../config/constant");
const { sequelize } = require("../Schema");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      exam_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'exams', key: 'id' }
      },
      question: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      ans: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      marks: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.ACTIVE,
        comment: "0 => Inactive, 1 => Active"
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.NOTDELETED,
        comment: "0 => Not deleted 1 => Deleted"
      },
      sortOrder: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('questions');
  }
};