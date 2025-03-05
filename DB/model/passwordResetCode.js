import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
const passwordResetCode = sequelize.define('ResetCode', {
    code: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
}, {
    timestamps: true,
});

export default passwordResetCode;
