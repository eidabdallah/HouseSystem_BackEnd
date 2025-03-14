import { sequelize } from "../../../DB/connection.js";
import houseModel from "../../../DB/model/house.model.js";
import reservationModel from "../../../DB/model/reservation.model.js";
import roomModel from "../../../DB/model/room.model.js";
import roomPhotoModel from "../../../DB/model/roomPhoto.model.js";
import studentModel from "../../../DB/model/student.model.js";
import { AppError } from "../../utils/AppError.js";
import userModel from './../../../DB/model/user.model.js';
import {Sequelize } from 'sequelize';

export const createHouse = async (req, res, next) => {
    req.body.UserId = req.user.id;
    await houseModel.create(req.body);
    return res.status(201).json({ message: "تم انشاء البيت بنجاح" });
}
export const getAllHousesForStudents = async (req, res, next) => {
     const student = await studentModel.findOne({
            where: { UserId: req.user.id },
            attributes: ['gender']
        });
        if (!student) return res.status(404).json({ message: "الطالب غير موجود" });
        const { gender } = student;
        const houseList = await houseModel.findAll({
            where: { status: 'Active', gender },
            attributes: ['address', 'id', 'houseType'],
            include: [
                {
                    model: roomModel,
                    attributes: ["id", "noOfBed"],
                    where: { roomType: 'sleepRoom' },
                    required: true, 
                },
            ]
        });
        const roomReservations = await reservationModel.findAll({
            attributes: ['RoomId', [sequelize.fn('sum', sequelize.col('numberOfBedsBooked')), 'totalBookedBeds']],
            group: ['RoomId'],
        });
        const roomBookings = roomReservations.reduce((acc, curr) => {
            acc[curr.RoomId] = curr.dataValues.totalBookedBeds || 0;
            return acc;
        }, {});

        const filteredHouses = houseList.map(house => {
            const availableRooms = house.Rooms.filter(room => {
                const bookedBeds = roomBookings[room.id] || 0;
                return bookedBeds < room.noOfBed;
            });

            if (availableRooms.length > 0) {
                return {
                    address: house.address,
                    id: house.id,
                    houseType: house.houseType,
                    totalRooms: house.Rooms.length,
                    availableRoomsCount: availableRooms.length,
                };
            }
            return null;
        }).filter(house => house !== null);

        return res.status(200).json({
            message: "تم جلب البيوت بنجاح",
            houses: filteredHouses
        });
};

export const getHouseListForHouseOwner = async (req, res, next) => {
    const houseList = await houseModel.findAll({
        where: { UserId: req.user.id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] },
        include: [
            {
                model: roomModel,
                where: { roomType: { [Sequelize.Op.ne]: 'SecondaryRoom' } }, 
                include: [
                    {
                        model: roomPhotoModel,
                        attributes: { exclude: ['RoomId', 'createdAt', 'updatedAt'] }
                    },
                ],
                attributes: { exclude: ['price', 'noOfBed', 'createdAt', 'updatedAt'] }
            },
        ]
    });

    return res.status(200).json({
        message: "تم جلب البيوت بنجاح",
        houseList
    });
}
export const getHouseDetails = async (req, res, next) => {
    try {
        const house = await houseModel.findByPk(req.params.id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] },
            include: [
                {
                    model: roomModel,
                    attributes: ['id', 'roomType', 'noOfBed', 'price'],
                    include: [
                        {
                            model: roomPhotoModel,
                            attributes: ['secure_url'],
                            limit: 1
                        }
                    ]
                }
            ]
        });

        if (!house) return next(new Error("البيت غير موجود"));

        // جلب الغرف من النوع sleepRoom
        const sleepRooms = house.Rooms.filter(room => room.roomType === 'sleepRoom');

        // جلب الحجزات لجميع الغرف لتحديد الغرف المتاحة
        const roomReservations = await reservationModel.findAll({
            attributes: ['RoomId', [sequelize.fn('sum', sequelize.col('numberOfBedsBooked')), 'totalBookedBeds']],
            group: ['RoomId'],
        });

        // تحويل حجزات الغرف إلى كائن يسهل الوصول إليه
        const roomBookings = roomReservations.reduce((acc, curr) => {
            acc[curr.RoomId] = curr.dataValues.totalBookedBeds || 0;
            return acc;
        }, {});

        // تصفية الغرف المتاحة بناءً على الحجز
        const availableSleepRooms = sleepRooms.filter(room => {
            const bookedBeds = roomBookings[room.id] || 0;
            return bookedBeds < room.noOfBed; // الغرفة متاحة إذا كانت السعة المتبقية أكثر من الحجز الحالي
        });

        let secondaryRooms = house.Rooms.filter(room => room.roomType === 'SecondaryRoom');
        secondaryRooms = secondaryRooms.map(room => {
            delete room.dataValues.noOfBed;
            delete room.dataValues.price;
            return room;
        });

        return res.status(200).json({
            message: "تم جلب البيت بنجاح",
            house: {
                id: house.id,
                address: house.address,
                numberOfRooms: house.numberOfRooms,
                description: house.description,
                houseType: house.houseType,
                gender: house.gender,
                sleepRooms: availableSleepRooms,  // إرجاع الغرف المتاحة فقط
                secondaryRooms
            }
        });
    } catch (error) {
        return next(error);
    }
};


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

