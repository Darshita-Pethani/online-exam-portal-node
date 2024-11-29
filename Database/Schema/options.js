const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class options extends Model {
        static associate(models) {
            options.belongsTo(models.questions, {
                foreignKey: "question_id",
                onDelete: 'cascade'
            });
        }
    }
    options.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        question_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'questions', key: 'id' }
        },
        option_value: {
            allowNull: false,
            defaultValue: null,
            type: DataTypes.STRING(255),
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
        modelName: 'options',
    })

    return options
}