
'use strict';

const { STATUS, GENDER } = require("../../config/constant");

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20).UNSIGNED
            },
            role_id: {
                allowNull: true,
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: { model: 'roles', key: 'id' }
            },
            first_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            full_name: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            phone_no: {
                allowNull: false,
                type: Sequelize.BIGINT(10),
            },
            address: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            date_of_birth: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            gender: {
                allowNull: false,
                type: Sequelize.TINYINT(1),
                defaultValue: GENDER.MALE,
                comment: "0 => Male, 1 => Female"
            },
            status: {
                allowNull: false,
                type: Sequelize.TINYINT(1),
                defaultValue: STATUS.ACTIVE,
                comment: "0 => Inactive, 1 => Active"
            },
            sortOrder: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.STRING(255),
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

        await queryInterface.dropTable('users');
    }
};