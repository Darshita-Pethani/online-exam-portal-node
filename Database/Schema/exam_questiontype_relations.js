const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class exam_questiontype_relations extends Model {
        static associate(models) {
            exam_questiontype_relations.belongsTo(models.exams, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            exam_questiontype_relations.belongsTo(models.question_types, {
                foreignKey: "question_type_id",
                onDelete: 'cascade'
            });
        }
    }
    exam_questiontype_relations.init({
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
        question_type_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'question_types', key: 'id' }
        },
        total_questions: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
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
        modelName: 'exam_questiontype_relations',
    })

    return exam_questiontype_relations
}