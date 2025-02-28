import { Router } from 'express';
import * as controller from './admin.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { validation } from '../../middleware/validation.middleware.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './admin.role.js';
import { changeConfirmEmailSchema, deleteUserSchema, updateAccountStatusSchema } from './admin.validation.js';
const router = Router();

router.get('/', asyncHandler(auth(endPoints.admin)), asyncHandler(controller.getAllUsers));
router.get('/request', asyncHandler(auth(endPoints.admin)), asyncHandler(controller.gethouseOwnerRequest));
router.patch('/status', validation(updateAccountStatusSchema), asyncHandler(auth(endPoints.admin)), asyncHandler(controller.updateAccountStatus));
router.patch('/:id',validation(changeConfirmEmailSchema), asyncHandler(auth(endPoints.admin)), asyncHandler(controller.changeConfirmEmail));
router.delete('/:id', validation(deleteUserSchema) , asyncHandler(auth(endPoints.admin)), asyncHandler(controller.deleteUser));


export default router;