import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const reservationModel = sequelize.define('Reservation', {
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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true,
});

export default reservationModel;

