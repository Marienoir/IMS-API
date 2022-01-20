import express from 'express';
import { createNewUser, login } from '../controller/authentication';
import { createPurchase, updateApprovalStatus, updateDisapprovalStatus } from '../controller/purchase';
import { getAnItemByName, getTotalStocks } from '../controller/stock';
import {
  getUsers, getAUserById, deleteAUserById, updateAUserById,
} from '../controller/user';
import { checkIfEmailExists, checkIfUserIsAdmin, verifyToken } from '../middleware/auth';
import { checkProductAndCreateStock, checkApprovalStatus } from '../middleware/productCheck';
import validateInput from '../middleware/validation';
import { createPurchaseSchema, createUserSchema, loginUserSchema } from '../validation';

const router = express.Router();

router.post('/api/v1/register', validateInput(createUserSchema, 'body'), verifyToken, checkIfUserIsAdmin, checkIfEmailExists, createNewUser);
router.post('/api/v1/login', validateInput(loginUserSchema, 'body'), login);
router.get('/api/v1/users', verifyToken, checkIfUserIsAdmin, getUsers);
router.get('/api/v1/user/:id', verifyToken, checkIfUserIsAdmin, getAUserById);
router.delete('/api/v1/users/delete/:id', verifyToken, checkIfUserIsAdmin, deleteAUserById);
router.put('/api/v1/users/update/:id', verifyToken, checkIfUserIsAdmin, updateAUserById);

router.post('/api/v1/purchase/create', validateInput(createPurchaseSchema, 'body'), verifyToken, checkIfUserIsAdmin, checkProductAndCreateStock, createPurchase);
router.get('/api/v1/stock', verifyToken, checkIfUserIsAdmin, getAnItemByName);
router.get('/api/v1/stocks', verifyToken, checkIfUserIsAdmin, getTotalStocks);
router.put('/api/v1/purchase/approve/:id', verifyToken, checkIfUserIsAdmin, checkApprovalStatus, updateApprovalStatus);
router.put('/api/v1/purchase/disapprove/:id', verifyToken, checkIfUserIsAdmin, checkApprovalStatus, updateDisapprovalStatus);

export default router;
