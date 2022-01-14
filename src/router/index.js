import express from 'express';
import { createNewUser, logUser } from '../controller/authentication';
import createPurchase from '../controller/purchase';
import {
  getUsers, getAUserById, deleteAUserById, updateAUserById,
} from '../controller/user';
import { checkIfEmailExists, checkIfUserIsAdmin, verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/api/v1/register', verifyToken, checkIfUserIsAdmin, checkIfEmailExists, createNewUser);
router.post('/api/v1/login', logUser);
router.get('/api/v1/users', verifyToken, checkIfUserIsAdmin, getUsers);
router.get('/api/v1/user/:id', verifyToken, checkIfUserIsAdmin, getAUserById);
router.delete('/api/v1/users/delete/:id', verifyToken, checkIfUserIsAdmin, deleteAUserById);
router.put('/api/v1/users/update/:id', verifyToken, checkIfUserIsAdmin, updateAUserById);

router.post('/api/v1/purchase/create', verifyToken, checkIfUserIsAdmin, createPurchase);

export default router;
