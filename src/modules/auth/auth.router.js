import {Router} from 'express';
import * as controller from './auth.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { checkUserCredential } from './../../middleware/checkUserCredential.js';
import { validation } from '../../middleware/validation.middleware.js';
import { studentRegisterSchema } from './auth.validation.js';
const router = Router();

router.post('/sRegister' , validation(studentRegisterSchema) , checkUserCredential , asyncHandler(controller.studentRegister));
router.get('/confirmEmail/:token', asyncHandler(controller.confirmEmail));
export default router;