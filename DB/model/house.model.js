import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const houseModel = sequelize.define('House', {
    location:{ // gps
        type: DataTypes.STRING,
        allowNull: false,  
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
        allowNull: false
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

export default houseModel;
