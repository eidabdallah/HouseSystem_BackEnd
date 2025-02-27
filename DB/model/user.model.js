import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import studentModel from './student.model.js';
import houseOwnerModel from './houseOwner.model.js';

const userModel = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'User name is required'
            },
            len: {
                args: [3, 50],
                msg: 'User name must be between 3 and 50 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address'
            },
            notEmpty: {
                msg: 'Email is required'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 60],
                msg: 'Password must be between 6 and 20 characters'
            }
        }
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
        allowNull: false,
        validate: {
            isIn: {
                args: [['Student', 'HouseOwner', 'Admin']],
                msg: 'Role must be one of: Student, HouseOwner, Admin'
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Phone number is required'
            },
            isNumeric: {
                msg: 'Phone number must only contain numbers'
            }
        }
    },
    status: {
        type: DataTypes.ENUM('Active', 'No_Active'),
        defaultValue: 'Active',
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
});

userModel.hasOne(studentModel, { foreignKey: 'userId', as: 'student' });
studentModel.belongsTo(userModel, { foreignKey: 'userId', as: 'user' });
houseOwnerModel.belongsTo(userModel, { foreignKey: 'userId', as: 'user' });


export default userModel;
