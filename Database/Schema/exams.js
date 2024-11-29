const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class exams extends Model {
        static associate(models) {
            exams.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            exams.belongsTo(models.subjects, {
                foreignKey: "subject_id",
                onDelete: 'cascade'
            });
            exams.hasMany(models.questions, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            exams.hasMany(models.user_exam_enrolls, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            exams.hasMany(models.results, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            exams.belongsTo(models.exam_types, {
                foreignKey: "exam_type_id",
                onDelete: 'cascade'
            });
            exams.hasMany(models.exam_questiontype_relations, {
                foreignKey: "exam_id",
                onDelete: 'cascade'
            });
            exams.belongsTo(models.standards, {
                foreignKey: "standard_id",
                onDelete: 'cascade',
            });
        }
    }
    exams.init({
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
        subject_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'subjects', key: 'id' }
        },
        standard_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'standards', key: 'id' }
        },
        exam_type_id: {
            allowNull: false,
            type: DataTypes.STRING(255),
            references: { model: 'exam_types', key: 'id' }
        },
        total_questions: {
            allowNull: false,
            defaultValue: 0,
            type: DataTypes.BIGINT(20).UNSIGNED,
        },
        total_marks: {
            allowNull: false,
            defaultValue: 0,
            type: DataTypes.BIGINT(20).UNSIGNED,
        },
        date: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
        start_time: {
            allowNull: false,
            type: DataTypes.TIME,
        },
        end_time: {
            allowNull: false,
            type: DataTypes.TIME,
        },
        exam_duration: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        min_percentage: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.COMPLETE,
            comment: "0 => Pending 1=> Completed 2=>closed "
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
        modelName: 'exams',
    })

    return exams
}