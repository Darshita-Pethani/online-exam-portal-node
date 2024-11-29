const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { STATUS } = require("../../config/constant");
module.exports = (sequelize, DataTypes) => {
    class student_otp_verifications extends Model {
        static associate(models) {
            student_otp_verifications.belongsTo(models.students, {
                foreignKey: "student_id",
                sourceKey: "id",
                onDelete: 'cascade'
            });
        }
    }
    student_otp_verifications.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        otp: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        student_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'students', key: 'id' }
        },
        expireAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }

    }, {
        sequelize,
        modelName: 'student_otp_verifications'
    })

    return student_otp_verifications
}