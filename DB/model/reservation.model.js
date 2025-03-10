import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const reservationModel = sequelize.define('Reservation', {
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
}, {
    timestamps: true,
});

export default reservationModel;

