import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import { SpecializationsEnum } from '../../src/utils/enum/specialization.enum.js';
import { UniversityBuildingsEnum } from '../../src/utils/enum/universityBuilding.enum.js';
import { CollegesEnum } from '../../src/utils/enum/college.enum.js';

const studentModel = sequelize.define('Student', {
    universityBuilding: {
        type: DataTypes.ENUM(UniversityBuildingsEnum),
        allowNull: false,
    },
    college: {
        type: DataTypes.ENUM(...CollegesEnum),
        allowNull: false,
    },
    specialization: {
        type: DataTypes.ENUM(...SpecializationsEnum),
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default studentModel;
