const { Model } = require('sequelize');
const { ROLE_TYPES, STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
    class students extends Model {
        static associate(models) {
            students.belongsTo(models.roles, {
                foreignKey: "role_id",
                onDelete: 'cascade'
            });
        }
    }
    students.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        role_id: {
            allowNull: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'roles', key: 'id' }
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            set(val) {
                this.setDataValue('first_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
                this.setDataValue('full_name', `${this.getDataValue('first_name') || ''} ${this.getDataValue('last_name') || ''}`);
            },
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            set(val) {
                this.setDataValue('last_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
                this.setDataValue('full_name', `${this.getDataValue('first_name') || ''} ${this.getDataValue('last_name') || ''}`);
            },
        },
        full_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            get() {
                return `${this.first_name ? this.first_name : ''} ${this.last_name ? this.last_name : ''}`;
            },
        },
        email: {
            allowNull: false,
            defaultValue: null,
            type: DataTypes.STRING(255),
            set(val) {
                this.setDataValue('email', val.toLowerCase())
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: null,
        },
        gender: {
            type: DataTypes.STRING(500),
            allowNull: false,
            defaultValue: null,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: null,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: null,
        },
        phone_no: {
            allowNull: false,
            type: DataTypes.BIGINT(10),
            defaultValue: null,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
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
            comment: "0 => not_deleted, 1 => Deleted"
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
        modelName: 'students',
    })

    return students
}