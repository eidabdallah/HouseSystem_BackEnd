import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const userModel = sequelize.define('User',
    {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmEmail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        sendCode: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        role: {
            type: DataTypes.ENUM('Student', 'HouseOwner', 'Admin'),
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            defaultValue: 'Active',
            allowNull: false
        }
    },{
        timestamps: true,
    });


export default userModel;