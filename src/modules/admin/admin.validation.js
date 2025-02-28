import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
export const updateAccountStatusSchema = Joi.object({
    id: generalFields.id,
    status: Joi.string().valid('Active', 'No_Active').required().messages({
        "any.only": "حالة الحساب يجب ان تكون Active او No_Active.",
        "any.required": "حالة الحساب مطلوبة.",
    })
});

export const changeConfirmEmailSchema = Joi.object({
    id: generalFields.id,
});

export const deleteUserSchema = Joi.object({
   id: generalFields.id,
});
