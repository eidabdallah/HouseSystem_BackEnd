import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import studentModel from './student.model.js';
import houseOwnerModel from './houseOwner.model.js';
import passwordResetCode from './passwordResetCode.model.js';
import houseModel from './house.model.js';
import reservationModel from './reservation.model.js';
import bookingRequestModel from './bookingRequest.model.js';

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

userModel.hasOne(studentModel, { onDelete: 'CASCADE' });
studentModel.belongsTo(userModel, { onDelete: 'CASCADE' });

userModel.hasOne(houseOwnerModel, { onDelete: 'CASCADE' });
houseOwnerModel.belongsTo(userModel, { onDelete: 'CASCADE' });

userModel.hasOne(passwordResetCode, { onDelete: 'CASCADE' });
passwordResetCode.belongsTo(userModel, { onDelete: 'CASCADE' });

userModel.hasMany(houseModel, { onDelete: 'CASCADE' });
houseModel.belongsTo(userModel, { onDelete: 'CASCADE' });

userModel.hasMany(reservationModel, { onDelete: 'CASCADE' });
reservationModel.belongsTo(userModel, { onDelete: 'CASCADE' });

userModel.hasMany(bookingRequestModel, { onDelete: 'CASCADE' });
bookingRequestModel.belongsTo(userModel, { onDelete: 'CASCADE' });

export default userModel;
