import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import roomPhotoModel from './roomPhoto.model.js';
import reservationModel from './reservation.model.js';
import bookingRequestModel from './bookingRequest.model.js';
const roomModel = sequelize.define('Room', {
    roomType: {
        type: DataTypes.ENUM('sleepRoom', 'SecondaryRoom'),
        allowNull: false,
        required: true
    },
    noOfBed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true,
});
roomModel.hasMany(roomPhotoModel, { onDelete: 'CASCADE' });
roomPhotoModel.belongsTo(roomModel, { onDelete: 'CASCADE' });

roomModel.hasMany(reservationModel, { onDelete: 'CASCADE' });
reservationModel.belongsTo(roomModel, { onDelete: 'CASCADE' });

roomModel.hasMany(bookingRequestModel, { onDelete: 'CASCADE' });
bookingRequestModel.belongsTo(roomModel, { onDelete: 'CASCADE' });

export default roomModel;
