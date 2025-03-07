import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import roomModel from './room.model.js';
const houseModel = sequelize.define('House', {
    location:{ // gps
        type: DataTypes.STRING,
        allowNull: true,
    },
    address :{
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Active', 'No_Active'),
        defaultValue: 'Active',
    },
    description : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    houseType:{
        type: DataTypes.ENUM('Apartment', 'Studio'),
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
}, {
    timestamps: true,
});

houseModel.hasMany(roomModel, { onDelete: 'CASCADE' });
roomModel.belongsTo(houseModel, { onDelete: 'CASCADE' });

export default houseModel;
