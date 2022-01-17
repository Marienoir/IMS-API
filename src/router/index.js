import express from 'express';
import { createNewUser, logUser } from '../controller/authentication';
import createPurchase from '../controller/purchase';
import { getAnItemByName } from '../controller/stock';
import {
  getUsers, getAUserById, deleteAUserById, updateAUserById, searchUserByName,
} from '../controller/user';
import { checkIfEmailExists, checkIfUserIsAdmin, verifyToken } from '../middleware/auth';
import checkIfProductExists from '../middleware/productCheck';
import validateInput from '../middleware/validation';
import { createPurchaseSchema, createUserSchema, loginUserSchema } from '../validation';

const router = express.Router();

router.post('/api/v1/register', validateInput(createUserSchema), verifyToken, checkIfUserIsAdmin, checkIfEmailExists, createNewUser);
router.post('/api/v1/login', validateInput(loginUserSchema), logUser);
router.get('/api/v1/users', verifyToken, checkIfUserIsAdmin, getUsers);
router.get('/api/v1/user/:id', verifyToken, checkIfUserIsAdmin, getAUserById);
router.delete('/api/v1/users/delete/:id', verifyToken, checkIfUserIsAdmin, deleteAUserById);
router.put('/api/v1/users/update/:id', verifyToken, checkIfUserIsAdmin, updateAUserById);
router.get('/api/v1/search/', verifyToken, checkIfUserIsAdmin, searchUserByName);

router.post('/api/v1/purchase/create', validateInput(createPurchaseSchema), verifyToken, checkIfUserIsAdmin, checkIfProductExists, createPurchase);
router.get('/api/v1/stock/', verifyToken, checkIfUserIsAdmin, getAnItemByName);

export default router;
