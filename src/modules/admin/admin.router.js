import { Router } from 'express';
import * as controller from './admin.controller.js';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './admin.role.js';
const router = Router();

router.get('/', asyncHandler(auth(endPoints.admin)), asyncHandler(controller.getAllUsers));


export default router;