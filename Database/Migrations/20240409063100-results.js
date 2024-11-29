
'use strict';

const { STATUS, ROLE_TYPES } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id' }
      },
      exam_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'exams', key: 'id' }
      },
      user_exam_enroll_id: {
        allowNull: true,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'user_exam_enrolls', key: 'id' }
      },
      total_marks: {
        type: Sequelize.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      standard_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'standards', key: 'id' }
    },
      status: {
        allowNull: true,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.ACTIVE,
        comment: "0 => Inactive, 1 => Active"
      },
      sortOrder: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 0,
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.NOTDELETED,
        comment: "0 => not_deleted, 1 => Deleted"
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
    await queryInterface.dropTable('results');
  }
};