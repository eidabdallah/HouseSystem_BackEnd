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
        "any.only": "المبنى الجامعي غير صالح.",
        "any.required": "المبنى الجامعي مطلوب.",
    }),

    college: Joi.string().valid(...CollegesEnum).required().messages({
        "any.only": "الكلية غير صالحة.",
        "any.required": "الكلية مطلوبة.",
    }),

    specialization: Joi.string().valid(...SpecializationsEnum).required().messages({
        "any.only": "التخصص غير صالح.",
        "any.required": "التخصص مطلوب.",
    }),
    gender: Joi.string().valid('Male', 'Female').required().messages({
        "any.only": "الجنس يجب أن يكون 'ذكر' أو 'أنثى'.",
        "any.required": "الجنس مطلوب.",
    }),
});

export const houseOwnerRegisterSchema = Joi.object({
    userName: generalFields.userName,
    email: generalFields.hEmail,
    password: generalFields.password,
    phoneNumber: generalFields.phoneNumber,
    image: generalFields.image.optional(),
});

export const loginSchema = Joi.object({
    email: Joi.alternatives().try(
        generalFields.hEmail,
        generalFields.sEmail
    ).required().messages({
        "alternatives.match": "يجب أن يكون البريد الإلكتروني إما بريد طالب من جامعة النجاح أو بريد Gmail.",
        "any.required": "البريد الإلكتروني مطلوب."
    }),
    password: generalFields.password,
});

export const sendCodeSchema = Joi.object({
    email: Joi.alternatives().try(
        generalFields.hEmail,
        generalFields.sEmail
    ).required().messages({
        "alternatives.match": "يجب أن يكون البريد الإلكتروني إما بريد طالب من جامعة النجاح أو بريد Gmail.",
        "any.required": "البريد الإلكتروني مطلوب."
    }),
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.alternatives().try(
        generalFields.hEmail,
        generalFields.sEmail
    ).required().messages({
        "alternatives.match": "يجب أن يكون البريد الإلكتروني إما بريد طالب من جامعة النجاح أو بريد Gmail.",
        "any.required": "البريد الإلكتروني مطلوب."
    }),
    password: generalFields.password,
    code: Joi.string().length(6).required().messages({
        'string.base': 'يجب أن يكون الرمز عبارة عن نص.',
        'string.empty': 'لا يمكن أن يكون الرمز فارغاً.',
        'string.length': 'الرمز خاطئ .',
        'any.required': 'الرمز مطلوب.'
    })
});

export const changePasswordSchema = Joi.object({
    email: Joi.alternatives().try(
        generalFields.hEmail,
        generalFields.sEmail
    ).required().messages({
        "alternatives.match": "يجب أن يكون البريد الإلكتروني إما بريد طالب من جامعة النجاح أو بريد Gmail.",
        "any.required": "البريد الإلكتروني مطلوب."
    }),
    oldPassword: generalFields.password,
    newPassword: generalFields.password,
});