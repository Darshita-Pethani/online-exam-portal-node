const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class standards extends Model {
        static associate(models) {
            standards.hasOne(models.standard_user_relations, {
                foreignKey: "standard_id",
                onDelete: 'cascade',
            });
            standards.hasMany(models.exams, {
                foreignKey: "standard_id",
                onDelete: 'cascade',
            });
            standards.hasMany(models.results, {
                foreignKey: "standard_id",
                onDelete: 'cascade'
            });
        }
    }
    standards.init({
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
        modelName: 'standards',
    })

    return standards
}