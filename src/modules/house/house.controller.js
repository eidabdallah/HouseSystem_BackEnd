import houseModel from "../../../DB/model/house.model.js";

export const createHouse = async (req , res , next) => {
    req.body.UserId = req.user.id;
    await houseModel.create(req.body);
    return res.status(201).json({message : "تم انشاء البيت بنجاح"});
}

export const getHouseList = async (req , res , next) => {
    const houseList = await houseModel.findAll({ where: { UserId: req.user.id } });
    return res.status(200).json({ houseList });
}