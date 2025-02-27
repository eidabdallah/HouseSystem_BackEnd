
import Joi from 'joi';
export const generalFields = {
    id: Joi.number().integer().min(1).required().messages({
        "number.base": "ID must be a number.",
        "number.integer": "ID must be an integer.",
        "number.min": "ID must be greater than 0.",
        "any.required": "ID field is required.",
    }),
    sEmail: Joi.string()
    .pattern(/^s\d{8}@stu\.najah\.edu$/)
    .required()
    .messages({
      "string.pattern.base": "Student email must follow the format: s(unvi_number)@stu.najah.edu",
      "any.required": "Email field is required.",
    }),
  
     
    hEmail: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required().messages({
        "string.email": "Please enter a valid email address.",
        "string.pattern.base": "Only Gmail addresses are allowed for owners.",
        "any.required": "Email field is required.",
    }),
    password: Joi.string().min(8).max(32).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/).required().messages({
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password must not exceed 32 characters.",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "any.required": "Password field is required.",
    }),
    image: Joi.object({
        fieldname: Joi.string().required().messages({
            "string.empty": "Fieldname is required.",
            "any.required": "Fieldname is required."
        }),
        originalname: Joi.string().required().messages({
            "string.empty": "Original filename is required.",
            "any.required": "Original filename is required."
        }),
        encoding: Joi.string().required().messages({
            "string.empty": "Encoding type is required.",
            "any.required": "Encoding type is required."
        }),
        mimetype: Joi.string()
            .valid("image/png", "image/jpeg", "image/gif", "image/ico", "image/svg+xml")
            .required()
            .messages({
                "any.only": "Invalid image format. Allowed formats: PNG, JPEG, GIF, ICO, SVG.",
                "any.required": "MIME type is required."
            }),
        destination: Joi.string().required().messages({
            "string.empty": "Destination path is required.",
            "any.required": "Destination path is required."
        }),
        filename: Joi.string().required().messages({
            "string.empty": "Filename is required.",
            "any.required": "Filename is required."
        }),
        path: Joi.string().required().messages({
            "string.empty": "File path is required.",
            "any.required": "File path is required."
        }),
        size: Joi.number().max(5000000).required().messages({
            "number.max": "File size must not exceed 5MB.",
            "any.required": "File size is required."
        })
    }).required().messages({
        "any.required": "Image is required."
    }),
}
export const validation = (Schema) => {
    return (req, res, next) => {
        let fillterData = {};
        if (req.file)
            fillterData = { image: req.file, ...req.body, ...req.params, ...req.query };
        else if (req.files)
            fillterData = { ...req.files , ...req.body, ...req.params, ...req.query };
        else
            fillterData = { ...req.body, ...req.params, ...req.query };
        const errorMessages = {};
        const { error } = Schema.validate(fillterData, { abortEarly: false });
        if (error) {
            error.details.forEach((err) => {
                const key = err.context.key;
                errorMessages[key] = err.message;
            });
            return res.status(400).json({ message: "validation Error", error: errorMessages });
        }
        next();
    };
}  