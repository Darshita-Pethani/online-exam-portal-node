'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_relations', {
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
            added_by: {
                allowNull: false,
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: { model: 'users', key: 'id', as: 'addedBy' }
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
        await queryInterface.dropTable('user_relations');
    }
};