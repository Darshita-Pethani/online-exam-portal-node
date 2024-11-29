'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      role_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'roles', key: 'id', as: 'role_id' },
        onDelete: 'CASCADE'
      },
      module_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'modules', key: 'id', as: 'module_id' },
        onDelete: 'CASCADE'
      },
      read_access: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        comment: "(0 = Not access and 1 = access)"
      },
      write_access: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        comment: "(0 = Not access and 1 = access)"
      },
      delete_access: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        comment: "(0 = Not access and 1 = access)"
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

    await queryInterface.dropTable('permissions');
  }
};
