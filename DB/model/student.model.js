import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import { SpecializationsEnum } from '../../src/utils/enum/specialization.enum.js';
import { UniversityBuildingsEnum } from '../../src/utils/enum/universityBuilding.enum.js';
import { CollegesEnum } from '../../src/utils/enum/college.enum.js';

const studentModel = sequelize.define('Student', {
    universityBuilding: {
        type: DataTypes.ENUM(UniversityBuildingsEnum),
        allowNull: false,
        validate: {
            isIn: {
                args: [UniversityBuildingsEnum],
                msg: `College must be one of: ${UniversityBuildingsEnum.join(", ")}`
            }
        }
    },
    college: {
        type: DataTypes.ENUM(...CollegesEnum),
        allowNull: false,
        validate: {
            isIn: {
                args: [CollegesEnum],
                msg: `College must be one of: ${CollegesEnum.join(", ")}`
            }
        }
    },
    specialization: {
        type: DataTypes.ENUM(...SpecializationsEnum),
        allowNull: false,
        validate: {
            isIn: {
                args: [SpecializationsEnum],
                msg: `College must be one of: ${SpecializationsEnum.join(", ")}`
            }
        }
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Male', 'Female']],
                msg: 'Gender must be either Male or Female'
            }
        }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Birth date must be a valid date'
            }
        }
    },
    university_Id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        validate: {
            isInt: {
                msg: 'University ID must be a valid integer'
            },
            len: {
                args: [8, 8],
                msg: 'University ID must be exactly 8 digits long'
            }
        }
    }
}, {
    timestamps: true,
});

export default studentModel;
