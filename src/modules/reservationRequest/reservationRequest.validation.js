import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

const today = new Date().toISOString().split('T')[0];

export const createRequsetReservationSchema = Joi.object({
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
    RoomId: generalFields.id
});
export const deleteRequestSchema = Joi.object({
    id: generalFields.id,
});
export const updateRequestSchema = Joi.object({
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

export const changeBookingStatusSchema = Joi.object({
    id: generalFields.id,
    status: Joi.string().valid('confirmed', 'pending', 'rejected', 'reviewing ').required().messages({
        "any.only": "حالة الطلب يجب أن تكون 'confirmed', 'pending' أو 'rejected'أو reviewing ",
        "any.required": "حالة الطلب مطلوبة."
    })
});
