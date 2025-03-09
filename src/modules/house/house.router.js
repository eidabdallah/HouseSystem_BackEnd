import { Router } from 'express';
import * as controller from './house.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './house.role.js';
import roomRouter from '../room/room.router.js';
import { createHouseSchema, deleteHouseSchema, updateHouseInformationSchema, updateHouseStatusSchema } from './house.validation.js';
const router = Router();

router.use('/:id/room', roomRouter);
router.post('/create', asyncHandler(validation(createHouseSchema)), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.createHouse));
router.get('/allHouses', asyncHandler(auth(endPoints.student)), asyncHandler(controller.getAllHousesForStudents));
router.get('/', asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.getHouseListForHouseOwner));
router.patch('/:id', asyncHandler(validation(updateHouseInformationSchema)), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.updateHouseInformation));
router.patch('/status/:id', asyncHandler(validation(updateHouseStatusSchema)), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.updateHouseStatus));
router.delete('/:id', asyncHandler(validation(deleteHouseSchema)), asyncHandler(auth(endPoints.delete)), asyncHandler(controller.deleteHouse));
export default router;