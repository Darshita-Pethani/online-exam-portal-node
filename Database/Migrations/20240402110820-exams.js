'use strict';

const { STATUS } = require("../../config/constant");
const { sequelize } = require("../Schema");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exams', {
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
      subject_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'subjects', key: 'id' }
      },
      standard_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'standards', key: 'id' }
      },
      exam_type_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'exam_types', key: 'id' }
      },
      total_questions: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
      },
      total_marks: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      start_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      end_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      exam_duration: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      min_percentage: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.COMPLETE,
        comment: "0 => Pending 1=> Completed 2=>closed "
      },
      sortOrder: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: '0',
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
    await queryInterface.dropTable('exams');
  }
};