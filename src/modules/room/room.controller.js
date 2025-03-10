import houseModel from "../../../DB/model/house.model.js";
import roomModel from "../../../DB/model/room.model.js";
import roomPhotoModel from "../../../DB/model/roomPhoto.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from './../../utils/cloudinary.js';

export const create = async (req, res, next) => {
    const { roomType } = req.body;
    const { id } = req.params; // houseId 
    const house = await houseModel.findByPk(id);
    if (!house) return next(new AppError('البيت غير متوفر.', 404));
    const room = await roomModel.create({ roomType, HouseId: id });
    if (req.files.photo) {
        for (const file of req.files.photo) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path,
                { folder: `${process.env.APPNAME}/houses/house${id}/room${room.id}/` });
            await roomPhotoModel.create({ secure_url, public_id, RoomId: room.id });
        }
    }
    return res.status(201).json({ message: 'الغرفة تم إنشاؤها بنجاح.' });
}
export const updateRoom = async (req, res, next) => {

    const room = await roomModel.findByPk(req.params.roomId);
    if (!room) return next(new AppError('الغرفة غير موجودة.', 404));
    if (req.params.id != room.HouseId)
        return next(new AppError('هذه الغرفة ليست في هذا المنزل', 403));
    if (req.files.photo) {
        const oldPhotos = await roomPhotoModel.findAll({ where: { RoomId: room.id } });
        for (const photo of oldPhotos) {
            const { public_id } = photo;
            await cloudinary.uploader.destroy(public_id);
        }
        await roomPhotoModel.destroy({ where: { RoomId: room.id } });
        for (const file of req.files.photo) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: `${process.env.APPNAME}/houses/house${req.params.id}/room${room.id}/`
            });
            await roomPhotoModel.create({ secure_url, public_id, RoomId: room.id });
        }
    }
    if (req.body.roomType) {
        room.roomType = req.body.roomType;
        await room.save();
    }
    return res.status(200).json({ message: 'تم تحديث الغرفة بنجاح.' });
}
export const deleteRoom = async (req, res, next) => {
    const room = await roomModel.findByPk(req.params.id);
    if (!room) return next(new AppError('الغرفة غير موجودة.', 404));
    await room.destroy();
    return res.status(200).json({ message: 'الغرفة تم حذفها بنجاح.' });
}
export const getRoomById = async (req, res, next) => {
    const room = await roomModel.findByPk(req.params.roomId, {
        include: {
            model: roomPhotoModel,
            attributes: ['id', 'secure_url']
        },
        attributes: ['id', 'roomType', 'HouseId']
    });
    if (!room) return next(new AppError('الغرفة غير موجودة.', 404));
    if (req.params.id != room.HouseId)
        return next(new AppError('هذه الغرفة ليست في هذا المنزل', 403));
    return res.status(200).json({ message: "تم جلب الصورة بنجاح", room });

}
