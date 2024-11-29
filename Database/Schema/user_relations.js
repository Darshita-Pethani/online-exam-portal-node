'use strict';
const {
    Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
    class user_relations extends Model {
        static associate(models) {
            user_relations.belongsTo(models.users, {
                foreignKey: 'user_id',
                onDelete: 'cascade'
            })
            user_relations.belongsTo(models.users, {
                foreignKey: 'added_by',
                as: 'addedBy',
                onDelete: 'cascade'
            })
        }
    }
    user_relations.init({
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
        added_by: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'users', key: 'id', as: 'addedBy' }
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
        modelName: 'user_relations',
    });
    return user_relations;
};