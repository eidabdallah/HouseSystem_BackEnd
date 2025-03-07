import houseModel from "../../../DB/model/house.model.js";
import studentModel from "../../../DB/model/student.model.js";
import { AppError } from "../../utils/AppError.js";

export const createHouse = async (req, res, next) => {
    req.body.UserId = req.user.id;
    await houseModel.create(req.body);
    return res.status(201).json({ message: "تم انشاء البيت بنجاح" });
}

// بدها تعديل لاضيف كم غرفة فاضية وهاي الاشياء
export const getAllHousesForStudents = async (req, res, next) => {
    const { gender } = await studentModel.findOne({
        where: { UserId: req.user.id },
        attributes: ['gender']
    });
    const houseList = await houseModel.findAll({
        where: { status: 'Active', gender },
        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] }
    });
    return res.status(200).json({ message: "تم جلب البيوت بنجاح", houseList });
}

export const getHouseListForHouseOwner = async (req, res, next) => {
    const houseList = await houseModel.findAll({
        where: { UserId: req.user.id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] }
    });
    return res.status(200).json({ message: "تم جلب البيوت بنجاح", houseList });
}

// هون تفاصيل البيت بالتفصيل مع الغرف واشياء تفاصيل اكثر
export const getHouseDetails = async (req, res, next) => {
    // const house = await houseModel.findByPk(req.params.id, {
    //     attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] }
    // });
    // if (!house) return next(new Error("البيت غير موجود"));
    // return res.status(200).json({ message: "تم جلب البيت بنجاح", house });
}

export const updateHouseInformation = async (req, res, next) => {
    const house = await houseModel.findByPk(req.params.id);
    if (!house) return next(new AppError('البيت غير متوفر.', 404));

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "لم يتم إرسال أي بيانات للتحديث." });
    }
    let isUpdated = false;
    if (req.body.address && req.body.address !== house.address) {
        house.address = req.body.address;
        isUpdated = true;
    }
    if (req.body.description && req.body.description !== house.description) {
        house.description = req.body.description;
        isUpdated = true;
    }
    if (req.body.gender && req.body.gender !== house.gender) {
        house.gender = req.body.gender;
        isUpdated = true;
    }
    if (!isUpdated) {
        return res.status(400).json({ message: "لم يتم تغيير أي بيانات، القيم المدخلة مطابقة للموجودة." });
    }
    await house.save();
    return res.status(200).json({ message: "تم تحديث معلومات البيت بنجاح" });
};

export const updateHouseStatus = async (req, res, next) => {
    const house = await houseModel.findByPk(req.params.id);
    if (!house) return next(new AppError('البيت غير متوفر.', 404));
    if (req.body.status === house.status) {
        return res.status(400).json({ message: "لم يتم تغيير أي بيانات، الحالة المدخلة مطابقة للموجودة." });
    }
    house.status = req.body.status;
    house.save();
    return res.status(200).json({ message: "تم تحديث حالة البيت بنجاح" });
}
export const deleteHouse = async (req, res, next) => {
    const house = await houseModel.findByPk(req.params.id);
    if (!house) return next(new AppError('البيت غير متوفر.', 404));
    await house.destroy();
    return res.status(200).json({ message: "تم حذف البيت بنجاح" });
}

