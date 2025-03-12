
/*
يعمل الحجز ✅
يلغي الحجز ✅
يعدل الحجز ✅
الطالب يقدم طلب تجديد وصاحب السكن يوافق عليه او يرفض
يجيب كل الحجوزات لصاحب السكن ✅
الطالب يشوف الحجز تاعه وكم متبقي 
*/

import { Op } from "sequelize";
import houseModel from "../../../DB/model/house.model.js";
import reservationModel from "../../../DB/model/reservation.model.js";
import roomModel from "../../../DB/model/room.model.js";
import roomPhotoModel from "../../../DB/model/roomPhoto.model.js";
import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";
import moment from 'moment';

export const createReservation = async (req, res, next) => {
    const { checkInDate, checkOutDate, numberOfBedsBooked, RoomId, UserId, price } = req.body;
    const user = await userModel.findByPk(UserId);
    if (!user) {
        return next(new AppError('المستخدم غير موجود', 404));
    }
    const room = await roomModel.findByPk(RoomId);
    if (!room) {
        return next(new AppError('الغرفة غير موجودة', 404));
    }
    const existingReservations = await reservationModel.findAll({
        where: { RoomId },
    });
    let totalBedsBooked = 0;
    for (const reservation of existingReservations) {
        totalBedsBooked += reservation.numberOfBedsBooked;
    }
    const availableBeds = room.noOfBed - totalBedsBooked;
    if (numberOfBedsBooked > availableBeds) {
        return next(new AppError('عدد الأسرة المتاحة غير كافٍ للحجز', 400));
    }
    await reservationModel.create({ checkInDate, checkOutDate, numberOfBedsBooked, RoomId, UserId, price });
    return res.status(201).json({ message: "تم اضافة الحجز بنجاح" });
};


export const deleteReservation = async (req, res, next) => {
    const reservation = await reservationModel.findByPk(req.params.id);
    if (!reservation) return next(new AppError('الحجز غير موجود', 404));
    reservation.destroy();
    return res.status(200).json({ message: "تم الغاء الحجز بنجاح" });
}

export const getAllReservation = async (req, res, next) => {
    const houseOwnerId = req.user.id;
    const houses = await houseModel.findAll({
        where: { UserId: houseOwnerId },
        attributes: ['id']
    });
    if (!houses.length) {
        return next(new AppError('لا يوجد حجوزات', 404));
    }
    const houseIds = houses.map(house => house.id);
    const rooms = await roomModel.findAll({
        where: { HouseId: houseIds },
        attributes: ['id']
    });
    if (!rooms.length) {
        return next(new AppError('لا يوجد حجوزات', 404));
    }
    const roomIds = rooms.map(room => room.id);
    const reservations = await reservationModel.findAll({
        where: { RoomId: roomIds },
        attributes: ['id', 'price'],
        include: [
            {
                model: roomModel,
                attributes: ['id', 'HouseId'],
                include: [
                    {
                        model: roomPhotoModel,
                        attributes: ['secure_url']
                    }
                ]
            }
        ]
    });
    if (!reservations.length) {
        return next(new AppError('لا يوجد حجوزات', 404));
    }
    return res.status(200).json({ message: "تم جلب جميع الحجوزات", reservations });

}


export const getReservationById = async (req, res, next) => {
    const reservation = await reservationModel.findByPk(req.params.id, {
        attributes: ['checkInDate', 'checkOutDate', 'numberOfBedsBooked', 'price'],
        include: [
            {
                model: userModel,
                attributes: ['userName', 'phoneNumber'],
            },
            {
                model: roomModel,
                attributes: ['id', 'HouseId'],
                include: [
                    {
                        model: roomPhotoModel,
                        attributes: ['secure_url']
                    }
                ]
            }
        ]
    });
    if (!reservation) return next(new AppError('الحجز غير موجود', 404));
    const today = moment().startOf('day');
    const checkOutDate = moment(reservation.checkOutDate).startOf('day');

    const daysRemaining = checkOutDate.diff(today, 'days');

    return res.status(200).json({
        message: "تم جلب الحجز",
        reservation,
        daysRemaining: daysRemaining > 0 ? `${daysRemaining} ايام` : 0
    });
}

export const updateReservation = async (req, res, next) => {
    const reservation = await reservationModel.findByPk(req.params.id);
    if (!reservation) return next(new AppError('الحجز غير موجود', 404));

    const { checkInDate, checkOutDate, numberOfBedsBooked } = req.body;

    const room = await roomModel.findByPk(reservation.RoomId);
    if (!room) return next(new AppError('الغرفة غير موجودة', 404));
    if(numberOfBedsBooked > room.noOfBed)
        return next(new AppError('عدد الأسرة المتاحة غير كافي للحجز', 400));
    const existingReservations = await reservationModel.findAll({
        where: { RoomId: room.id, id: { [Op.not]: reservation.id } },
        attributes: ['id', 'UserId', 'numberOfBedsBooked']
    });
    let totalBedsBookedByOthers = existingReservations.reduce((sum, res) => sum + res.numberOfBedsBooked, 0);
    let availableBeds = room.noOfBed - totalBedsBookedByOthers;
    if (numberOfBedsBooked === reservation.numberOfBedsBooked) {
        await reservation.update({ checkInDate, checkOutDate });
        return res.status(200).json({ message: "تم تحديث الحجز بنجاح" });
    }
    if (numberOfBedsBooked > reservation.numberOfBedsBooked) {
        let extraBedsNeeded = numberOfBedsBooked - reservation.numberOfBedsBooked;
        let secondBedTakenByOther = existingReservations.some(res => res.UserId !== reservation.UserId);
        if (extraBedsNeeded > availableBeds || secondBedTakenByOther) {
            return next(new AppError('لا يمكنك حجز السرير الثاني لأنه محجوز من قبل شخص آخر', 400));
        }
    }
    let price = 0;
    if (numberOfBedsBooked === 2) {
        price = room.price;
    }
    if (numberOfBedsBooked === 1) {
        price = room.price / 2;
    }

    await reservation.update({
        checkInDate: checkInDate || reservation.checkInDate,
        checkOutDate: checkOutDate || reservation.checkOutDate,
        numberOfBedsBooked: numberOfBedsBooked,
        price: price
    });
    return res.status(200).json({ message: "تم تحديث الحجز بنجاح" });
};