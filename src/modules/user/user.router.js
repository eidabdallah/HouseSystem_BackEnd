import {Router} from 'express';
import * as controller from './user.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './user.role.js';
import { updateUserInfromationSchema } from './user.validation.js';
const router = Router();


router.patch('/updateInfromation', validation(updateUserInfromationSchema) ,asyncHandler(auth(endPoints.updateInformation)) ,asyncHandler(controller.updateUserInfromation));
export default router;