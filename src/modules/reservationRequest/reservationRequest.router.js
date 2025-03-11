import { Router } from 'express';
import * as controller from './reservationRequest.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './reservationRequest.role.js';
import { changeBookingStatusSchema, createRequsetReservationSchema, deleteRequestSchema, updateRequestSchema } from './reservationRequest.validation.js';
const router = Router();

router.post('/', validation(createRequsetReservationSchema), asyncHandler(auth(endPoints.student)), asyncHandler(controller.createRequsetReservation));
router.get('/', asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.getRequsetReservation));
router.patch('/:id', validation(changeBookingStatusSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.changeBookingStatus));
router.get('/sReq', asyncHandler(auth(endPoints.student)), asyncHandler(controller.getStudentRequest));
router.delete('/:id', validation(deleteRequestSchema), asyncHandler(auth(endPoints.student)), asyncHandler(controller.deleteRequest));
router.patch('/updateReq/:id', validation(updateRequestSchema), asyncHandler(auth(endPoints.student)), asyncHandler(controller.updateRequest));


export default router;