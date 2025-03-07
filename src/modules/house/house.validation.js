import Joi from "joi";
export const createHouseSchema = Joi.object({
    location: Joi.string().optional().messages({
        "string.base": "الموقع يجب أن يكون نصًا.",
        "string.empty": "الموقع لا يمكن أن يكون فارغًا."
    }),
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