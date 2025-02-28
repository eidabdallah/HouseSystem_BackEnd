import houseOwnerModel from "../../../DB/model/houseOwner.model.js";
import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";

export const getAllUsers = async (req, res, next) => {
    const users = await userModel.findAll({
        attributes: ['userName', 'phoneNumber', 'role', 'status', 'confirmEmail'],
        where: {
            role: ['Student', 'HouseOwner']
        }
    });
    return res.status(200).json({ message: "تم جلب البيانات بنجاح", users })
}
export const gethouseOwnerRequest = async (req, res, next) => {
    const houseOwnerRequest = await userModel.findAll({
        attributes: ['userName', 'phoneNumber', 'role', 'status', 'confirmEmail'],
        where: {
            role: 'HouseOwner',
            status: 'No_Active'
        },
        include: [{
            model: houseOwnerModel,
            as: 'houseOwner',
            attributes: ['royaltyPhoto'] 
        }]
    });
    return res.status(200).json({ message: "تم جلب البيانات بنجاح", houseOwnerRequest })
}

export const updateAccountStatus = async (req, res, next) => {
    const { id, status } = req.body;
    const user = await userModel.findByPk(id);
    if (!user)
        return next(new AppError('المستخدم غير موجود', 404));
    user.status = status;
    await user.save();
    return res.status(200).json({ message: "تم تحديث حالة الحساب بنجاح" });
}

export const changeConfirmEmail = async (req, res, next) => {
    const user = await userModel.findByPk(req.params.id);
    if (!user)
        return next(new AppError('المستخدم غير موجود', 404));
    user.confirmEmail = true;
    await user.save();
    return res.status(200).json({ message: "تم تاكيد البريد الالكتروني" });
}


export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findByPk(id);
    if (!user)
        return next(new AppError('المستخدم غير موجود', 404));
    await user.destroy();
    return res.status(200).json({ message: "تم حذف المستخدم بنجاح" });
}

