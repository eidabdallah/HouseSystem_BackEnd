import {Router} from 'express';
import * as controller from './auth.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { checkUserCredential } from './../../middleware/checkUserCredential.js';
import { validation } from '../../middleware/validation.middleware.js';
import { houseOwnerRegisterSchema, loginSchema, studentRegisterSchema } from './auth.validation.js';
import { fileMimeTypes, fileUpload } from './../../utils/multer.js';
const router = Router();

router.post('/sRegister' , validation(studentRegisterSchema) , checkUserCredential , asyncHandler(controller.studentRegister));
router.post('/hRegister' , fileUpload(fileMimeTypes.image).single('image'),validation(houseOwnerRegisterSchema) , checkUserCredential , asyncHandler(controller.HouseOwnerRegister));
router.post('/login' ,validation(loginSchema) ,asyncHandler(controller.Login));

router.get('/confirmEmail/:token', asyncHandler(controller.confirmEmail));
export default router;