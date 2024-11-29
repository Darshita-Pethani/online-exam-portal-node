const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class questions extends Model {
        static associate(models) {
            questions.belongsTo(models.exams, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            questions.hasMany(models.options, {
                foreignKey: "question_id",
                onDelete: 'cascade'
            });
        }
    }
    questions.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        exam_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'exams', key: 'id' }
        },
        question: {
            allowNull: false,
            defaultValue: null,
            type: DataTypes.STRING(255),
        },
        ans: {
            allowNull: false,
            defaultValue: null,
            type: DataTypes.STRING(255),
        },
        marks: {
            allowNull: false,
            defaultValue: null,
            type: DataTypes.BIGINT(20).UNSIGNED,
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
            comment: "0 => not_deleted 1 => Deleted"
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
        modelName: 'questions',
    })

    return questions
}