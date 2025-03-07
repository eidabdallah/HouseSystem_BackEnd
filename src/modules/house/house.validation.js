import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
export const createHouseSchema = Joi.object({
    address: Joi.string().required().messages({
        "string.base": "العنوان يجب أن يكون نصًا.",
        "string.empty": "العنوان مطلوب.",
        "any.required": "العنوان مطلوب."
    }),
    numberOfRooms: Joi.number().integer().min(1).required().messages({
        "number.base": "عدد الغرف يجب أن يكون رقمًا صحيحًا.",
        "number.integer": "عدد الغرف يجب أن يكون عددًا صحيحًا.",
        "number.min": "يجب أن يحتوي المنزل على غرفة واحدة على الأقل.",
        "any.required": "عدد الغرف مطلوب."
    }),
    description: Joi.string().required().messages({
        "string.base": "الوصف يجب أن يكون نصًا.",
        "string.empty": "الوصف مطلوب.",
        "any.required": "الوصف مطلوب."
    }),

    houseType: Joi.string().valid('Apartment', 'Studio').required().messages({
        "any.only": "نوع المنزل يجب أن يكون إما 'Apartment' أو 'Studio'.",
        "string.base": "نوع المنزل يجب أن يكون نصًا.",
        "string.empty": "نوع المنزل مطلوب.",
        "any.required": "نوع المنزل مطلوب."
    }),

    gender: Joi.string().valid('Male', 'Female').required().messages({
        "any.only": "الجنس يجب أن يكون إما 'Male' أو 'Female'.",
        "string.base": "الجنس يجب أن يكون نصًا.",
        "string.empty": "الجنس مطلوب.",
        "any.required": "الجنس مطلوب."
    })
});
export const updateHouseInformationSchema = Joi.object({
    id: generalFields.id,
    address: Joi.string().optional().messages({
        "string.base": "العنوان يجب أن يكون نصًا.",
        "string.empty": "العنوان مطلوب.",
        "any.required": "العنوان مطلوب."
    }),
    description: Joi.string().optional().messages({
        "string.base": "الوصف يجب أن يكون نصًا.",
        "string.empty": "الوصف مطلوب.",
        "any.required": "الوصف مطلوب."
    }),
    gender: Joi.string().valid('Male', 'Female').optional().messages({
        "any.only": "الجنس يجب أن يكون إما 'Male' أو 'Female'.",
        "string.base": "الجنس يجب أن يكون نصًا.",
        "string.empty": "الجنس مطلوب.",
        "any.required": "الجنس مطلوب."
    }),
});
export const updateHouseStatusSchema = Joi.object({
    id: generalFields.id,
    status: Joi.string().valid('Active', 'No_Active').required().messages({
        "any.only": "حالة المنزل يجب أن تكون 'Active' أو 'No_Active'.",
        "any.required": "حالة المنزل مطلوبة.",
    })
});
export const deleteHouseSchema = Joi.object({
    id: generalFields.id,
});