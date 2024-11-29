'use strict';
const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');

module.exports = (sequelize, DataTypes) => {
    class permissions extends Model {

        static associate(models) {

            permissions.belongsTo(models.roles, {
                foreignKey: "role_id",
                onDelete: 'cascade'
            });

            permissions.belongsTo(models.modules, {
                foreignKey: "module_id",
                onDelete: 'cascade'
            });
        }
    };

    permissions.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20)
        },
        role_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true,
        },
        module_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true,
        },
        read_access: {
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.INACTIVE,
            comment: "0 => Not Allowed, 1 => Allowed"
        },
        write_access: {
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.INACTIVE,
            comment: "0 => Not Allowed, 1 => Allowed"
        },
        delete_access: {
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.INACTIVE,
            comment: "0 => Not Allowed, 1 => Allowed"
        },
    }, {
        sequelize,
        modelName: 'permissions',
    });
    return permissions;
};