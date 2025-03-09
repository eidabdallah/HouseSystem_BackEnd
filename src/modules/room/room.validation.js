import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
export const createRoomSchema = Joi.object({
    id: generalFields.id,
    roomType: Joi.string().valid('sleepRoom', 'SecondaryRoom').required().messages({
        "any.only": "نوع الغرفة يجب أن يكون إما 'sleepRoom' أو 'Female'.",
        "string.base": "نوع الغرفة يجب أن يكون نصًا.",
        "string.empty": "نوع الغرفة مطلوب.",
        "any.required": "نوع الغرفة مطلوب."
    }),
    photo: Joi.array().items(generalFields.image).max(5),
});
export const updateRoomSchema = Joi.object({
    id: generalFields.id,
    roomType: Joi.string().valid('sleepRoom', 'SecondaryRoom').optional().messages({
        "any.only": "نوع الغرفة يجب أن يكون إما 'sleepRoom' أو 'Female'.",
        "string.base": "نوع الغرفة يجب أن يكون نصًا.",
        "string.empty": "نوع الغرفة مطلوب.",
        "any.required": "نوع الغرفة مطلوب."
    }),
    photo: Joi.array().items(generalFields.image).max(5).optional(),
});
export const deleteRoomSchema = Joi.object({
    id: generalFields.id,
});