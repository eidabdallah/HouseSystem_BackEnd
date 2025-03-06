import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const roomModel = sequelize.define('Room', {
    roomType:{
        type: DataTypes.ENUM('sleepRoom', 'SecondaryRoom'),
        allowNull: false,
        required: true
    },
    photo:{
        type: DataTypes.JSON,
        allowNull: false,
        required: true
    }
}, {
    timestamps: true,
});

export default roomModel;
