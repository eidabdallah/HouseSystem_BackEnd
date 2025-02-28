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
