import jwt from 'jsonwebtoken';
import userModel from './../../DB/model/user.model.js';
import { AppError } from './../utils/AppError.js';

export const roles = {
    ADMIN: 'Admin',
    STUDENT: 'Student',
    HOUSEOWNER : 'HouseOwner'
};
export const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARERKEY)) {
            return next(new AppError("التوكن غير متوفر", 401));
        }
        const token = authorization.split(process.env.BEARERKEY)[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_Login);
        if (!decode) {
            return next(new AppError("التوكن غير متوفر", 401));
        }
        const user = await userModel.findByPk(decode.id, {
            attributes: ['id' ,'userName', 'role', 'email']
        });
        if (!user) {
            return next(new AppError("المستخدم غير متوفر", 404));
        }
        if (!accessRoles.includes(user.role)) {
            return next(new AppError("لا يوجد صلاحيات", 403));
        }
        req.user = user;
        next();
    }
}