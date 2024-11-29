'use strict';
const {
    Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
    class standard_user_relations extends Model {
        static associate(models) {
            standard_user_relations.belongsTo(models.standards, {
                foreignKey: "standard_id",
                onDelete: 'cascade',
            });

            standard_user_relations.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
        }
    }
    standard_user_relations.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        standard_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'standards', key: 'id' }
        },
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'users', key: 'id' }
        },
        currant_standard: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            comment: "(0 = Not Current year and 1 = current year)"
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
        modelName: 'standard_user_relations',
    });
    return standard_user_relations;
};