'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('standard_user_relations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20).UNSIGNED
            },
            standard_id: {
                allowNull: false,
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: { model: 'standards', key: 'id' }
            },
            user_id: {
                allowNull: false,
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: { model: 'users', key: 'id' }
            },
            currant_standard: {
                allowNull: true,
                type: Sequelize.BOOLEAN,
                comment: "(0 = Not Current year and 1 = current year)"
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('standard_user_relations');
    }
};