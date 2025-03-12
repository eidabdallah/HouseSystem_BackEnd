import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

const today = new Date().toISOString().split('T')[0];

export const createReservationSchema = Joi.object({
    checkInDate: Joi.date().iso().min(today).required().messages({
        "date.base": "تاريخ الوصول يجب أن يكون تاريخًا صحيحًا.",
        "date.format": "تاريخ الوصول يجب أن يكون بتنسيق تاريخ صحيح (YYYY-MM-DD).",
        "date.min": `تاريخ الوصول يجب أن يكون من اليوم (${today}) أو لاحقًا.`,
        "any.required": "تاريخ الوصول مطلوب."
    }),
    checkOutDate: Joi.date().iso().min(today).required().messages({
        "date.base": "تاريخ المغادرة يجب أن يكون تاريخًا صحيحًا.",
        "date.format": "تاريخ المغادرة يجب أن يكون بتنسيق تاريخ صحيح (YYYY-MM-DD).",
        "date.min": `تاريخ المغادرة يجب أن يكون من اليوم (${today}) أو لاحقًا.`,
        "any.required": "تاريخ المغادرة مطلوب."
    }),
    numberOfBedsBooked: Joi.number().integer().min(1).required().messages({
        "number.base": "عدد الأسرة المحجوزة يجب أن يكون عددًا صحيحًا.",
        "number.integer": "عدد الأسرة المحجوزة يجب أن يكون عددًا صحيحًا.",
        "number.min": "يجب أن يكون عدد الأسرة المحجوزة أكبر من أو يساوي 1.",
        "any.required": "عدد الأسرة المحجوزة مطلوب."
    }),
    RoomId: generalFields.id,
    UserId: generalFields.id,
    price : Joi.number().required().messages({
        "number.base": "السعر يجب أن يكون رقما صحيحا.",
        "any.required": "السعر مطلوب."
    }),
});
export const deleteReservationSchema = Joi.object({
    id: generalFields.id,
});
export const updateReservationSchema = Joi.object({
    id: generalFields.id,
    checkInDate: Joi.date().iso().min(today).required().messages({
        "date.base": "تاريخ الوصول يجب أن يكون تاريخًا صحيحًا.",
        "date.format": "تاريخ الوصول يجب أن يكون بتنسيق تاريخ صحيح (YYYY-MM-DD).",
        "date.min": `تاريخ الوصول يجب أن يكون من اليوم (${today}) أو لاحقًا.`,
        "any.required": "تاريخ الوصول مطلوب."
    }),
    checkOutDate: Joi.date().iso().min(today).required().messages({
        "date.base": "تاريخ المغادرة يجب أن يكون تاريخًا صحيحًا.",
        "date.format": "تاريخ المغادرة يجب أن يكون بتنسيق تاريخ صحيح (YYYY-MM-DD).",
        "date.min": `تاريخ المغادرة يجب أن يكون من اليوم (${today}) أو لاحقًا.`,
        "any.required": "تاريخ المغادرة مطلوب."
    }),
    numberOfBedsBooked: Joi.number().integer().min(1).required().messages({
        "number.base": "عدد الأسرة المحجوزة يجب أن يكون عددًا صحيحًا.",
        "number.integer": "عدد الأسرة المحجوزة يجب أن يكون عددًا صحيحًا.",
        "number.min": "يجب أن يكون عدد الأسرة المحجوزة أكبر من أو يساوي 1.",
        "any.required": "عدد الأسرة المحجوزة مطلوب."
    }),
});

export const getReservationByIdSchema = Joi.object({
    id: generalFields.id,
});
