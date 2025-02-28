import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from "../../utils/AppError.js";
import { customAlphabet } from "nanoid";
import userModel from '../../../DB/model/user.model.js';
import studentModel from '../../../DB/model/student.model.js';
import { confirmEmailMessage, sendCodeToEmail, sendConfirmEmail } from '../../utils/authTemplete.js';
import houseOwnerModel from '../../../DB/model/houseOwner.model.js';
import cloudinary from './../../utils/cloudinary.js';

export const studentRegister = async (req, res, next) => {
    const { userName, email, password, phoneNumber, universityBuilding, college, specialization, gender } = req.body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const user = await userModel.create({ userName, email, password: hashPassword, phoneNumber, role: 'Student' });
    await studentModel.create({ universityBuilding, college, specialization, gender, userId: user.id });
    await sendConfirmEmail(email, userName, req);
    return res.status(201).json({ message: "Student registered successfully." });
}
export const HouseOwnerRegister = async (req, res, next) => {
    const { userName, email, password, phoneNumber } = req.body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const user = await userModel.create({ userName, email, password: hashPassword, phoneNumber, role: 'HouseOwner', status: 'No_Active' });
    if (req.file) {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APPNAME}/houseOwner/${userName}/royaltyPhoto`
        });
        await houseOwnerModel.create({royaltyPhoto : secure_url , userId: user.id });
    }
    await sendConfirmEmail(email, userName, req);
    return res.status(201).json({ message: "House Owner registered successfully." });
}
export const Login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('User credentials are wrong', 400)); 
    if (!user.confirmEmail)
        return next(new AppError('Please confirm your email through the verification email', 403));
    if (user.status === 'No_Active')
        return next(new AppError('Account is not activated , please wait to admin accept your account', 403));

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
        return next(new AppError('User credentials are wrong', 400));

    const token = jwt.sign({ id: user.id, email, userName: user.userName, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
    return res.status(200).json({ message: "Login successfully", token });
}

export const changePassword = async (req, res, next) => {

}
export const forgotPassword = async (req, res, next) => {

}
export const sendCode = async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('الايميل غير موجود', 404));
    const code = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 6)();
    user.sendCode = code;
    await user.save();
    await sendCodeToEmail(email, code);
    setTimeout(async () => {
        user.sendCode = '';
        await user.save();
    }, 3 * 60 * 1000);
    return res.status(200).json({ message: "Code sent successfully" });
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
        return next(new AppError('user not found', 404));
    }
}