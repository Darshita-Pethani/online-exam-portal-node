const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { STATUS } = require("../../Config/constant");
module.exports = (sequelize, DataTypes) => {
    class user_otp_verifications extends Model {
        static associate(models) {
            user_otp_verifications.belongsTo(models.users, {
                foreignKey: "user_id",
                sourceKey: "id",
                onDelete: 'cascade'
            });
        }
    }
    user_otp_verifications.init({
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
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'users', key: 'id' }
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
        modelName: 'user_otp_verifications'
    })

    return user_otp_verifications
}