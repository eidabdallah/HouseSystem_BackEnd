import {Router} from 'express';
import * as controller from './auth.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { checkUserCredential } from './../../middleware/checkUserCredential.js';
import { validation } from '../../middleware/validation.middleware.js';
import { changePasswordSchema, forgotPasswordSchema, houseOwnerRegisterSchema, loginSchema, sendCodeSchema, studentRegisterSchema } from './auth.validation.js';
import { fileMimeTypes, fileUpload } from './../../utils/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './auth.role.js';
const router = Router();

router.post('/sRegister' , validation(studentRegisterSchema) , checkUserCredential , asyncHandler(controller.studentRegister));
router.post('/hRegister' , fileUpload(fileMimeTypes.image).single('image'),validation(houseOwnerRegisterSchema) , checkUserCredential , asyncHandler(controller.HouseOwnerRegister));
router.post('/login' ,validation(loginSchema) ,asyncHandler(controller.Login));
router.patch('/changePassword',validation(changePasswordSchema), asyncHandler(auth(endPoints.changePassword)), asyncHandler(controller.changePassword));
router.patch('/sendCode', validation(sendCodeSchema), asyncHandler(controller.sendCode));
router.patch('/forgotPassword', validation(forgotPasswordSchema), asyncHandler(controller.forgotPassword));
router.get('/confirmEmail/:token', asyncHandler(controller.confirmEmail));
export default router;