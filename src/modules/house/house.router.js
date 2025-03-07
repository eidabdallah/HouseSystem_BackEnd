import { Router } from 'express';
import * as controller from './house.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './house.role.js';
import { createHouseSchema } from './house.validation.js';
const router = Router();

router.post('/create', asyncHandler(validation(createHouseSchema)), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.createHouse));

export default router;