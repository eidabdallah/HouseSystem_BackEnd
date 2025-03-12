import { Router } from 'express';
import * as controller from './reservation.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './reservation.role.js';
import { createReservationSchema, deleteReservationSchema, getReservationByIdSchema, updateReservationSchema } from './reservation.validation.js';
const router = Router();

router.post('/', validation(createReservationSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.createReservation));
router.delete('/:id', validation(deleteReservationSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.deleteReservation));
router.get('/', asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.getAllReservation));
router.get('/sReservation', asyncHandler(auth(endPoints.student)), asyncHandler(controller.getstudentReservation));
router.get('/:id', validation(getReservationByIdSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.getReservationById));
router.put('/:id', validation(updateReservationSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.updateReservation));


export default router;