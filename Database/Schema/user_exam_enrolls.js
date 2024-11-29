const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class user_exam_enrolls extends Model {
        static associate(models) {
            user_exam_enrolls.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            user_exam_enrolls.belongsTo(models.exams, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            user_exam_enrolls.hasMany(models.results, {
                foreignKey: "user_exam_enroll_id",
                onDelete: 'cascade'
            });
        }
    }
    user_exam_enrolls.init({
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
        
        status: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.ACTIVE,
            comment: "0 => Inactive, 1 => Active"
        },
        sortOrder: {
            type: DataTypes.STRING(255),
            allowNull: true,
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
        modelName: 'user_exam_enrolls',
    })

    return user_exam_enrolls
}