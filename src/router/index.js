import express from 'express';
import * as controller from '../controller/index';
import verifyToken from '../middleware/index';
import checkIfUserIsAdmin from '../validation';

const router = express.Router();

router.post('/api/v1/register', verifyToken, checkIfUserIsAdmin, controller.createNewUser);
router.post('/api/v1/login', controller.logUser);

export default router;
