import studentModel from '../../../DB/model/student.model.js';
import userModel from './../../../DB/model/user.model.js';
import { AppError } from './../../utils/AppError.js';

export const updateUserInfromation = async (req, res, next) => {
    const { userName, phoneNumber, universityBuilding, college, specialization } = req.body;
    if (Object.keys(req.body).length === 0) {
        return next(new AppError('يجب تحديد معلومات لتحديث', 400));
    }
    const user = await userModel.findByPk(req.user.id, {
        attributes: ['id', 'userName', 'role', 'phoneNumber']
    });
    if (!user) return next(new AppError('المستخدم غير متوفر', 404));
    if (phoneNumber) {
        const existingPhone = await userModel.findOne({ where: { phoneNumber } });
        if (existingPhone && existingPhone.id !== user.id) {
            return next(new AppError('رقم الهاتف هذا مستخدم بالفعل', 400));
        }
    }
    if (user.role === 'Admin' || user.role === 'HouseOwner') {
        if (userName) user.userName = userName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        await user.save();
        return res.status(200).json({ message: 'تم تحديث معلومات ' });
    } else if (user.role === 'Student') {
        if (userName) user.userName = userName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (universityBuilding || college || specialization) {
            await studentModel.update({
                universityBuilding: universityBuilding || undefined,
                college: college || undefined,
                specialization: specialization || undefined
            },
                { where: { userId: user.id } }
            );
        }
        await user.save();
        return res.status(200).json({ message: 'تم تحديث معلومات  ' });
    }
};
