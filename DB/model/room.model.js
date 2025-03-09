import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import roomPhotoModel from './roomPhoto.model.js';
const roomModel = sequelize.define('Room', {
    roomType:{
        type: DataTypes.ENUM('sleepRoom', 'SecondaryRoom'),
        allowNull: false,
        required: true
    }
}, {
    timestamps: true,
});
roomModel.hasMany(roomPhotoModel, { onDelete: 'CASCADE' });
roomPhotoModel.belongsTo(roomModel, { onDelete: 'CASCADE' });

export default roomModel;
