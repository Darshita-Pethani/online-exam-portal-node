const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');

module.exports = (sequelize, DataTypes) => {
    class modules extends Model {
        static associate(models) {
            modules.belongsToMany(models.roles, {
                through: models.permissions,
                foreignKey: 'module_id'
            });

            modules.hasMany(models.permissions, {
                foreignKey: "module_id",
                onDelete: 'cascade',
                as: "module_permission"
            });
        }
    };

    modules.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        status: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.ACTIVE,
            comment: "0 => Inactive, 1 => Active"
        },
        isDelete: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.NOTDELETED,
            comment: "0 => not_deleted, 1 => Deleted"
        },
        sortOrder: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'modules',
    });
    return modules;
};