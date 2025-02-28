import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
import { SpecializationsEnum } from "../../utils/enum/specialization.enum.js";
import { CollegesEnum } from "../../utils/enum/college.enum.js";
import { UniversityBuildingsEnum } from "../../utils/enum/universityBuilding.enum.js";
export const updateUserInfromationSchema = Joi.object({
    userName: generalFields.userName.optional(),
    phoneNumber: generalFields.phoneNumber.optional(),
    universityBuilding: Joi.string().valid(...UniversityBuildingsEnum).optional().messages({
        "any.only": "المبنى الجامعي غير صالح.",
        "any.required": "المبنى الجامعي مطلوب.",
    }),

    college: Joi.string().valid(...CollegesEnum).optional().messages({
        "any.only": "الكلية غير صالحة.",
        "any.required": "الكلية مطلوبة.",
    }),

    specialization: Joi.string().valid(...SpecializationsEnum).optional().messages({
        "any.only": "التخصص غير صالح.",
        "any.required": "التخصص مطلوب.",
    }),
});