import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const bookingRequestModel = sequelize.define('BookingRequest', {
    checkInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    numberOfBedsBooked: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'rejected', 'reviewing '),
        defaultValue: 'pending',
        allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true,
});

export default bookingRequestModel;

