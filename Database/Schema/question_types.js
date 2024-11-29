const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class question_types extends Model {
        static associate(models) {
            question_types.hasMany(models.exam_questiontype_relations, {
                foreignKey: "question_type_id",
                onDelete: 'cascade'
            });
        }
    }
    question_types.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(255),
            defaultValue: null
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
        modelName: 'question_types',
    })

    return question_types
}