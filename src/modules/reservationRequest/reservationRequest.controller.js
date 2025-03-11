import bookingRequestModel from "../../../DB/model/bookingRequest.model.js";
import houseModel from "../../../DB/model/house.model.js";
import reservationModel from "../../../DB/model/reservation.model.js";
import roomModel from "../../../DB/model/room.model.js";
import roomPhotoModel from "../../../DB/model/roomPhoto.model.js";
import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";

// for student : 
export const createRequsetReservation = async (req, res, next) => {
    const { checkInDate, checkOutDate, numberOfBedsBooked, RoomId } = req.body;
    req.body.UserId = req.user.id;
    const room = await roomModel.findByPk(RoomId);
    if (!room) return next(new AppError('الغرفة غير موجودة', 404));
    const existingReservation = await reservationModel.findAll({ where: { RoomId } });

    let totalBedsBooked = 0;
    for (const reservation of existingReservation) {
        totalBedsBooked += reservation.numberOfBedsBooked;
    }
    const availableBeds = room.noOfBed - totalBedsBooked;
    if (availableBeds < numberOfBedsBooked) {
        return next(new AppError('عدد الأسرة المطلوبة غير متاح في هذه الغرفة', 400));

    }
    await bookingRequestModel.create(req.body);
    return res.status(201).json({ message: 'تم تقديم الطلب بنجاح' });
}
export const getStudentRequest = async (req, res, next) => {
    const UserId = req.user.id; // student Id
    const bookingRequests = await bookingRequestModel.findAll({
        where: { UserId },
        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId', 'RoomId'] },
        include: [
            {
                model: roomModel,
                attributes: ['roomType'],
                include: [
                    {
                        model: roomPhotoModel,
                        attributes: ['secure_url'],
                    }
                ]
            },
        ],
    });
    if (!bookingRequests || bookingRequests.length === 0) {
        return res.status(404).json({ message: "لا توجد طلبات حجز لك" });
    }
    return res.status(200).json({
        message: "تم جلب جميع الطلبات",
        bookingRequests: bookingRequests,
    });
}
export const deleteRequest = async (req, res, next) => {
    const bookingRequest = await bookingRequestModel.findByPk(req.params.id);
    if (!bookingRequest) return next(new AppError('الطلب غير موجود', 404));
    if (req.user.id != bookingRequest.UserId)
        return next(new AppError('هذا الطلب ليس لك', 400));
    bookingRequest.destroy();
    return res.status(200).json({ message: "تم حذف الطلب بنجاح" });
}
export const updateRequest = async (req, res, next) => {
    const bookingRequest = await bookingRequestModel.findByPk(req.params.id);
    if (!bookingRequest) return next(new AppError('الطلب غير موجود', 404));
    if (req.user.id != bookingRequest.UserId)
        return next(new AppError('هذا الطلب ليس لك', 400));
    if (req.body.checkInDate) {
        bookingRequest.checkInDate = req.body.checkInDate;
    }
    if (req.body.checkOutDate) {
        bookingRequest.checkOutDate = req.body.checkOutDate;
    }
    if (req.body.numberOfBedsBooked) {
        bookingRequest.numberOfBedsBooked = req.body.numberOfBedsBooked;
        const room = await roomModel.findByPk(bookingRequest.RoomId);
        const availableBeds = room.noOfBed - bookingRequest.numberOfBedsBooked;
        if (availableBeds < 0) {
            return next(new AppError('عدد الأسرة المطلوبة غير متاح في هذه الغرفة', 400));
        }
    }
    bookingRequest.update(req.body);
    return res.status(200).json({ message: "تم تحديث الطلب بنجاح" });
}

// for admin : 
export const getRequsetReservation = async (req, res, next) => {

    const UserId = req.user.id; // house Owner Id

    const houses = await houseModel.findAll({ where: { UserId } });
    if (!houses || houses.length === 0) {
        return res.status(404).json({ message: "لا توجد بيوت مملوكة لهذا المستخدم" });
    }

    const houseIds = houses.map(house => house.id);
    const rooms = await roomModel.findAll({
        where: { HouseId: houseIds, roomType: 'sleepRoom' },
    });

    if (!rooms || rooms.length === 0) {
        return res.status(404).json({ message: "لا توجد غرف في هذه البيوت" });
    }

    const roomIds = rooms.map(room => room.id);
    const bookingRequests = await bookingRequestModel.findAll({
        where: { RoomId: roomIds, status: 'pending' },
        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] },
        include: [
            {
                model: userModel,
                attributes: ['id', 'userName', 'phoneNumber'],
            },
            {

                model: roomModel,
                attributes: ['roomType'],
                include: [
                    {
                        model: roomPhotoModel,
                        attributes: ['secure_url'],
                    }
                ]
            },
        ],
    });

    if (!bookingRequests || bookingRequests.length === 0) {
        return res.status(404).json({ message: "لا توجد طلبات حجز لهذه الغرفة" });
    }

    return res.status(200).json({
        message: "تم جلب جميع الطلبات",
        bookingRequests: bookingRequests,
    });
};

export const changeBookingStatus = async (req, res, next) => {
    const { status } = req.body;
    const bookingRequest = await bookingRequestModel.findByPk(req.params.id);
    if (!bookingRequest) return next(new AppError('الطلب غير موجود', 404));
    if (status === 'confirmed'){
        await bookingRequest.destroy();
        const reservationDetails = {
            UserId: bookingRequest.UserId,
            RoomId: bookingRequest.RoomId,
            checkInDate: bookingRequest.checkInDate,
            checkOutDate: bookingRequest.checkOutDate,
            numberOfBedsBooked: bookingRequest.numberOfBedsBooked,
        };
        return res.status(200).json({
            message: "تم تأكيد الطلب بنجاح",
            reservationDetails: reservationDetails,
        });
    }
    bookingRequest.status = status;
    bookingRequest.save();
    return res.status(200).json({ message: "تم تحديث حالة الطلب بنجاح" });
}


