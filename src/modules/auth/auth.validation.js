import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
import { SpecializationsEnum } from "../../utils/enum/specialization.enum.js";
import { CollegesEnum } from "../../utils/enum/college.enum.js";
import { UniversityBuildingsEnum } from "../../utils/enum/universityBuilding.enum.js";

export const studentRegisterSchema = Joi.object({
    userName: generalFields.userName,
    email: generalFields.sEmail,
    password: generalFields.password,
    phoneNumber: generalFields.phoneNumber,
    universityBuilding: Joi.string().valid(...UniversityBuildingsEnum).required().messages({
        "any.only": "Invalid university building.",
        "any.required": "University building is required.",
    }),

    college: Joi.string().valid(...CollegesEnum).required().messages({
        "any.only": "Invalid college.",
        "any.required": "College is required.",
    }),

    specialization: Joi.string().valid(...SpecializationsEnum).required().messages({
        "any.only": "Invalid specialization.",
        "any.required": "Specialization is required.",
    }),
    gender: Joi.string().valid('Male', 'Female').required().messages({
        "any.only": "Gender must be 'Male' or 'Female'.",
        "any.required": "Gender is required.",
    }),
});

export const houseOwnerRegisterSchema = Joi.object({
    userName: generalFields.userName,
    email: generalFields.hEmail,
    password: generalFields.password,
    phoneNumber: generalFields.phoneNumber,
    image : generalFields.image.optional(),
});

export const loginSchema = Joi.object({
    email: Joi.alternatives().try(
        generalFields.hEmail,
        generalFields.sEmail
    ).messages({
        "alternatives.match": "The email must be either a student email from An-Najah University or a Gmail address."
    }),
    password: generalFields.password,
});