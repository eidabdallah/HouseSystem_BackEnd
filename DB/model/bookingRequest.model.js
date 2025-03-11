import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const bookingRequestModel = sequelize.define('BookingRequest', {
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    numberOfBedsBooked: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
        defaultValue: 'pending',
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default bookingRequestModel;

