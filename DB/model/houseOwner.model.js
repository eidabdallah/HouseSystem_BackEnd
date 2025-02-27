import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const houseOwnerModel = sequelize.define('HouseOwner', {
    royaltyPhoto : {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
});

export default houseOwnerModel;
