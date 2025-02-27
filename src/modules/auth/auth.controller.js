import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from "../../utils/AppError.js";
import { customAlphabet } from "nanoid";
import userModel from '../../../DB/model/user.model.js';
import studentModel from '../../../DB/model/student.model.js';
import { confirmEmailMessage, sendConfirmEmail } from '../../utils/authTemplete.js';

export const studentRegister = async (req, res, next) => {
    const { userName, email, password, phoneNumber, universityBuilding, college, specialization, gender } = req.body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const user = await userModel.create({ userName, email, password: hashPassword, phoneNumber, role: 'Student' });
    await studentModel.create({ universityBuilding, college, specialization, gender, userId: user.id });
    await sendConfirmEmail(email, userName, req);
    return res.status(201).json({ message: "Student registered successfully." });
}
export const HouseOwnerRegister = async (req, res, next) => {
}
export const Login = async (req, res, next) => {

}
export const changePassword = async (req, res, next) => {

}
export const forgotPassword = async (req, res, next) => {

}
export const sendCode = async (req, res, next) => {

}
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ where: { email: decodedToken.email } });
    if (user) {
        user.confirmEmail = true;
        await user.save();
       await confirmEmailMessage(user.userName , res);
    } else {
        return next(new AppError('المستخدم غير متوفر', 404));
    }
}