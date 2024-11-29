'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class student_tokens extends Model {
        static associate(models) {
            student_tokens.belongsTo(models.students, {
                foreignKey: "student_id",
                onDelete: 'cascade'
            });
        }
    }
    student_tokens.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
        },
        access_token: {
            type: DataTypes.STRING(255),
            comment: "Token of student",
            allowNull: false,
        },
        student_id: {
            type: DataTypes.STRING(255),
            comment: "Id of admin",
            defaultValue: 0,
            references: { model: 'students', key: 'id' }

        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        }
    }, {
        sequelize,
        modelName: 'student_tokens',
    });
    return student_tokens;
};