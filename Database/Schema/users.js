const { Model } = require('sequelize');
const { STATUS, GENDER } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
            users.hasOne(models.user_tokens, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            users.hasOne(models.user_otp_verifications, {
                foreignKey: "user_id",
                sourceKey: "id",
                onDelete: 'cascade'
            });
            users.belongsTo(models.roles, {
                foreignKey: "role_id",
                onDelete: 'cascade'
            });
            users.hasMany(models.subjects, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            users.hasMany(models.exams, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            users.hasMany(models.user_exam_enrolls, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            users.hasMany(models.results, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            users.hasMany(models.user_relations, {
                foreignKey: "added_by",
                onDelete: 'cascade'
            });
            users.hasOne(models.standard_user_relations, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
        }
    }
    users.init({
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
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING(255),
            set(val) {
                this.setDataValue('email', val.toLowerCase())
            }
        },
        password: {
            allowNull: true,
            type: DataTypes.STRING(255),
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        phone_no: {
            allowNull: false,
            type: DataTypes.BIGINT(10),
            defaultValue: null,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: GENDER.MALE,
            comment: "0 => Male, 1 => Female"
        },
        status: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.ACTIVE,
            comment: "0 => Inactive, 1 => Active"
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
        modelName: 'users',
    })

    return users
}