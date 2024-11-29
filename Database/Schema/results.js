const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class results extends Model {
        static associate(models) {
            results.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            results.belongsTo(models.exams, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            results.belongsTo(models.standards, {
                foreignKey: "standard_id",
                onDelete: 'cascade'
            });
            results.belongsTo(models.user_exam_enrolls, {
                foreignKey: "user_exam_enroll_id",
                onDelete: 'cascade'
            });
        }
    }
    results.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'users', key: 'id' }
        },
        exam_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'exams', key: 'id' }
        },
        user_exam_enroll_id: {
            allowNull: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'user_exam_enrolls', key: 'id' }
        },
        standard_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'standards', key: 'id' }
        },
        total_marks: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            defaultValue: 0,
            allowNull: false,
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
        modelName: 'results',
    })

    return results
}