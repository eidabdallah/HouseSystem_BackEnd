import { Router } from 'express';
import * as controller from './reservationRequest.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './reservationRequest.role.js';
const router = Router();

router.post('/', asyncHandler(auth(endPoints.student)), asyncHandler(controller.createRequsetReservation));

export default router;