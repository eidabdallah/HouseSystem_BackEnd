import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
import { SpecializationsEnum } from "../../utils/enum/specialization.enum.js";
import { CollegesEnum } from "../../utils/enum/college.enum.js";
import { UniversityBuildingsEnum } from "../../utils/enum/universityBuilding.enum.js";

export const studentRegisterSchema = Joi.object({
    userName: Joi.string().pattern(/^[a-zA-Zء-ي ]+$/).required().min(3).max(20).messages({
        "string.empty": "اسم المستخدم مطلوب.",
        "any.required": "اسم المستخدم مطلوب.",
        "string.min": "اسم المستخدم يجب أن يكون 3 أحرف على الأقل.",
        "string.max": "اسم المستخدم يجب أن يكون 20 حرفًا كحد أقصى.",
        "string.pattern.base": "اسم المستخدم يجب أن يحتوي على أحرف أبجدية فقط ومسافات.",
    }),
    email: generalFields.sEmail,
    password: generalFields.password,
    phoneNumber: Joi.string().pattern(/^\d{10}$/).required().messages({
        "string.pattern.base": "Phone number must be exactly 10 digits.",
        "any.required": "Phone number field is required.",
    }),
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