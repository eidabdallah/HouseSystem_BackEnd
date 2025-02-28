
import Joi from 'joi';
export const generalFields = {
    id: Joi.number().integer().min(1).required().messages({
        "number.base": "المعرف يجب أن يكون رقمًا.",
        "number.integer": "المعرف يجب أن يكون عددًا صحيحًا.",
        "number.min": "المعرف يجب أن يكون أكبر من 0.",
        "any.required": "حقل المعرف مطلوب.",
    }),
    sEmail: Joi.string().pattern(/^s\d{8}@stu\.najah\.edu$/).required().messages({
        "string.pattern.base": "يجب أن يكون البريد الإلكتروني للطالب بالصيغة: s(رقم_الجامعة)@stu.najah.edu",
        "any.required": "حقل البريد الإلكتروني مطلوب.",
    }),
    hEmail: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required().messages({
        "string.email": "يرجى إدخال بريد إلكتروني صالح.",
        "string.pattern.base": "يُسمح فقط بعناوين Gmail لأصحاب العقارات.",
        "any.required": "حقل البريد الإلكتروني مطلوب.",
    }),
    password: Joi.string().min(8).max(32).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/).required().messages({
        "string.min": "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.",
        "string.max": "يجب ألا تتجاوز كلمة المرور 32 حرفًا.",
        "string.pattern.base": "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد، ورقم واحد، ورمز خاص واحد.",
        "any.required": "حقل كلمة المرور مطلوب.",
    }),
    phoneNumber: Joi.string().pattern(/^\d{10}$/).required().messages({
        "string.pattern.base": "يجب أن يتكون رقم الهاتف من 10 أرقام بالضبط.",
        "any.required": "حقل رقم الهاتف مطلوب.",
    }),
    userName: Joi.string().pattern(/^[a-zA-Zء-ي ]+$/).required().min(3).max(20).messages({
        "string.empty": "اسم المستخدم مطلوب.",
        "any.required": "اسم المستخدم مطلوب.",
        "string.min": "يجب أن يحتوي اسم المستخدم على 3 أحرف على الأقل.",
        "string.max": "يجب ألا يتجاوز اسم المستخدم 20 حرفًا.",
        "string.pattern.base": "يجب أن يحتوي اسم المستخدم على أحرف أبجدية ومسافات فقط.",
    }),    
    image: Joi.object({
        fieldname: Joi.string().required().messages({
            "string.empty": "اسم الحقل مطلوب.",
            "any.required": "اسم الحقل مطلوب."
        }),
        originalname: Joi.string().required().messages({
            "string.empty": "الاسم الأصلي للملف مطلوب.",
            "any.required": "الاسم الأصلي للملف مطلوب."
        }),
        encoding: Joi.string().required().messages({
            "string.empty": "نوع التشفير مطلوب.",
            "any.required": "نوع التشفير مطلوب."
        }),
        mimetype: Joi.string()
            .valid("image/png", "image/jpeg", "image/gif", "image/ico", "image/svg+xml")
            .required()
            .messages({
                "any.only": "تنسيق الصورة غير صالح. التنسيقات المسموح بها: PNG، JPEG، GIF، ICO، SVG.",
                "any.required": "نوع MIME مطلوب."
            }),
        destination: Joi.string().required().messages({
            "string.empty": "مسار الوجهة مطلوب.",
            "any.required": "مسار الوجهة مطلوب."
        }),
        filename: Joi.string().required().messages({
            "string.empty": "اسم الملف مطلوب.",
            "any.required": "اسم الملف مطلوب."
        }),
        path: Joi.string().required().messages({
            "string.empty": "مسار الملف مطلوب.",
            "any.required": "مسار الملف مطلوب."
        }),
        size: Joi.number().max(5000000).required().messages({
            "number.max": "يجب ألا يتجاوز حجم الملف 5 ميجابايت.",
            "any.required": "حجم الملف مطلوب."
        })
    }).required().messages({
        "any.required": "الصورة مطلوبة."
    }),
}
export const validation = (Schema) => {
    return (req, res, next) => {
        let fillterData = {};
        if (req.file)
            fillterData = { image: req.file, ...req.body, ...req.params, ...req.query };
        else if (req.files)
            fillterData = { ...req.files, ...req.body, ...req.params, ...req.query };
        else
            fillterData = { ...req.body, ...req.params, ...req.query };
        const errorMessages = {};
        const { error } = Schema.validate(fillterData, { abortEarly: false });
        if (error) {
            error.details.forEach((err) => {
                const key = err.context.key;
                errorMessages[key] = err.message;
            });
            return res.status(400).json({ message: "خطأ في التحقق من البيانات", error: errorMessages });
        }
        next();
    };
}  