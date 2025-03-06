import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import studentModel from './student.model.js';
import houseOwnerModel from './houseOwner.model.js';
import passwordResetCode from './passwordResetCode.model.js';

const userModel = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.ENUM('Student', 'HouseOwner', 'Admin'),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Active', 'No_Active'),
        defaultValue: 'Active',
        allowNull: false
    },
}, {
    timestamps: true,
});

userModel.hasOne(studentModel, { foreignKey: 'userId', as: 'student', onDelete: 'CASCADE' });
studentModel.belongsTo(userModel, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

userModel.hasOne(houseOwnerModel, { foreignKey: 'userId', as: 'houseOwner', onDelete: 'CASCADE' });
houseOwnerModel.belongsTo(userModel, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

userModel.hasOne(passwordResetCode, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
passwordResetCode.belongsTo(userModel, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });


export default userModel;
