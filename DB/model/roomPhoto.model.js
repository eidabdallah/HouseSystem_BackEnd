import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const roomPhotoModel = sequelize.define('RoomPhoto', {
    public_id: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    secure_url: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
}, {
    timestamps: true,
});

export default roomPhotoModel;
