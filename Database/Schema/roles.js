const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class roles extends Model {
        static associate(models) {
            roles.hasMany(models.users, {
                foreignKey: "role_id",
                onDelete: 'cascade'
            });
            roles.hasMany(models.students, {
                foreignKey: "role_id",
                onDelete: 'cascade'
            });
            roles.belongsToMany(models.modules, {
                through: models.permissions,
                foreignKey: 'role_id'
            });

            roles.hasMany(models.permissions, {
                foreignKey: "role_id",
                onDelete: 'cascade',
            });
        }
    }
    roles.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        status: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.ACTIVE,
            comment: "0 => Inactive, 1 => Active"
        },
        isDefault: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.NOT_DEFAULT,
        },
        sortOrder: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 0,
        },
        isDelete: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.NOTDELETED,
            comment: "0 => not_deleted 1 => Deleted"
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
        modelName: 'roles',
    })

    return roles
}