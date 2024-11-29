const { Model } = require('sequelize');
const { ROLE_TYPES, STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class subjects extends Model {
        static associate(models) {
            subjects.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            subjects.hasMany(models.exams, {
                foreignKey: "subject_id",
                onDelete: 'cascade'
            });
        }
    }
    subjects.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        user_id: {
            allowNull: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'users', key: 'id' }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: null,
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
            comment: "0 => not_deleted, 1 => Deleted"
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
        modelName: 'subjects',
    })

    return subjects
}