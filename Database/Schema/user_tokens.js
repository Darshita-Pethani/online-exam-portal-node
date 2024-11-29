const { Model } = require('sequelize');
const { STATUS } = require("../../Config/constant");
module.exports = (sequelize, DataTypes) => {
    class user_tokens extends Model {
        static associate(models) {
            user_tokens.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
        }
    }

    user_tokens.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        access_token: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        user_id: {
            defaultValue: 0,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'users', key: 'id' }
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
        modelName: 'user_tokens',
        freezeTableName: true
    })

    return user_tokens
}