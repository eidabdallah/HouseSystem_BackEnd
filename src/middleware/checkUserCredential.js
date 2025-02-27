import userModel from "../../DB/model/user.model.js";
import { AppError } from './../utils/AppError.js';

export const checkUserCredential = async (req, res, next) => {
  const { email, phoneNumber } = req.body;
  const checkEmail = await userModel.findOne({ where: { email } });
  if (checkEmail)
    return next(new AppError('Email already exists.', 409));

  const checkPhone = await userModel.findOne({ where: { phoneNumber } });
  if (checkPhone)
    return next(new AppError('Phone number already exists.', 409));

  next();
}