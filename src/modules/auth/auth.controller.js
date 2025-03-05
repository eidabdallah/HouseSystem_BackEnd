import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from "../../utils/AppError.js";
import { customAlphabet } from "nanoid";
import userModel from '../../../DB/model/user.model.js';
import studentModel from '../../../DB/model/student.model.js';
import { confirmEmailMessage, sendCodeToEmail, sendConfirmEmail } from '../../utils/authTemplete.js';
import houseOwnerModel from '../../../DB/model/houseOwner.model.js';
import cloudinary from './../../utils/cloudinary.js';
import passwordResetCode from '../../../DB/model/passwordResetCode.js';

export const studentRegister = async (req, res, next) => {
    const { userName, email, password, phoneNumber, universityBuilding, college, specialization, gender } = req.body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const user = await userModel.create({ userName, email, password: hashPassword, phoneNumber, role: 'Student' });
    await studentModel.create({ universityBuilding, college, specialization, gender, userId: user.id });
    await sendConfirmEmail(email, userName, req);
    return res.status(201).json({ message: "تم تسجيل الطالب بنجاح ، يرجى تاكيد حسابك عبر الايميل" });
}
export const HouseOwnerRegister = async (req, res, next) => {
    const { userName, email, password, phoneNumber } = req.body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const user = await userModel.create({ userName, email, password: hashPassword, phoneNumber, role: 'HouseOwner', status: 'No_Active' });
    if (req.file) {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APPNAME}/houseOwner/${userName}/royaltyPhoto`
        });
        await houseOwnerModel.create({ royaltyPhoto: secure_url, userId: user.id });
    }
    await sendConfirmEmail(email, userName, req);
    return res.status(201).json({ message: "تم تسجيل مالك السكن بنجاح ، يرجى تاكيد حسابك عبر الايميل" });
}
export const Login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('بيانات المستخدم غير صحيحة.', 400));
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
        return next(new AppError('بيانات المستخدم غير صحيحة.', 400));
    if (!user.confirmEmail)
        return next(new AppError('يرجى تأكيد بريدك الإلكتروني من خلال رسالة التحقق.', 403));
    if (user.status === 'No_Active')
        return next(new AppError('الحساب غير مفعل، يرجى الانتظار حتى يقوم المسؤول بقبول حسابك.', 403));


    const token = jwt.sign({ id: user.id, email, userName: user.userName, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
    return res.status(200).json({ message: "تم تسجيل الدخول بنجاح.", token });
}

export const changePassword = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    if (req.user.email != email)
        return next(new AppError('ايميلك الحالي لا يطابق هذا الايميل', 403));
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('الايميل غير متوفر', 404));
    const isMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!isMatch)
        return next(new AppError('كلمة السر القديمة خاطئة', 403));
    user.password = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUND));
    await user.save();
    return res.status(200).json({ message: "تم اعادة تغيير كلمة المرور بنجاح" })
}
export const forgotPassword = async (req, res, next) => {
    const { email, password, code } = req.body;    
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
        return next(new AppError('الايميل غير موجود', 404));
    }
    const resetCode = await passwordResetCode.findOne({
        where: { userId: user.id, code }
    });
    if (!resetCode) {
        return next(new AppError('رمز التاكيد غير صحيح', 403));
    }
    user.password = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    await resetCode.destroy();
    await user.save();
    return res.status(200).json({ message: "تم اعادة تغيير كلمة المرور بنجاح" });
};

export const sendCode = async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('الايميل غير موجود', 404));
    const code = customAlphabet('123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();
    await passwordResetCode.create({code , userId : user.id});
    await sendCodeToEmail(email, code);
    return res.status(200).json({ message: "تم إرسال الرمز على الايميل ." });
}
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ where: { email: decodedToken.email } });
    if (user) {
        user.confirmEmail = true;
        await user.save();
        await confirmEmailMessage(user.userName, res);
    } else {
        return next(new AppError('المستخدم غير موجود.', 404));
    }
}