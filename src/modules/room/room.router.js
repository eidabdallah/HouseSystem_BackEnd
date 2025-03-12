import { Router } from 'express';
import * as controller from './room.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './room.role.js';
import { fileMimeTypes, fileUpload } from '../../utils/multer.js';
import { createRoomSchema, deleteRoomSchema, getRoomByIdSchema, updateRoomSchema } from './room.validation.js';
const router = Router({ mergeParams: true });

router.post('/', fileUpload(fileMimeTypes.image).fields([{ name: 'photo', maxCount: 5 }]), validation(createRoomSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.create));
router.patch('/:roomId', fileUpload(fileMimeTypes.image).fields([{ name: 'photo', maxCount: 5 }]), validation(updateRoomSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.updateRoom));
router.delete('/:id', validation(deleteRoomSchema), asyncHandler(auth(endPoints.houseOwner)), asyncHandler(controller.deleteRoom));
router.get('/:roomId',validation(getRoomByIdSchema) , asyncHandler(auth(endPoints.get)) , asyncHandler(controller.getRoomById));
export default router;