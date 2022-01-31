import express from 'express';
import { createNewUser, login, refreshToken } from '../controller/authentication';
import { createPurchase, updateApprovalStatus } from '../controller/purchase';
import { createRefunds, getTotalRefunds, updateStockIfNotFaulty } from '../controller/refund';
import { createSales, getTotalSales } from '../controller/sales';
import { getAnItemByName, getTotalStocks } from '../controller/stock';
import {
  getUsers, getAUserById, deleteAUserById, updateAUserById, updateSchedule,
} from '../controller/user';
import { checkIfEmailExists, checkIfUserIsAdmin, verifyToken } from '../middleware/auth';
import { cache, refreshCache } from '../middleware/cache';
import {
  checkApprovalStatus, checkIfProductExistsById,
  checkIfProductExistsByName,
} from '../middleware/checkProduct';
import updateStockPriceAndQuantity from '../middleware/productCheck';
import validateInput from '../middleware/validation';
import {
  createPurchaseSchema, createUserSchema, loginUserSchema, refreshTokenSchema,
} from '../validation';

const router = express.Router();
// AUTHENTICATION
router.post('/api/v1/auth/refresh_token', validateInput(refreshTokenSchema, 'body'), verifyToken('user'), refreshCache, refreshToken);
router.post('/api/v1/auth/register', validateInput(createUserSchema, 'body'), verifyToken('admin'), checkIfUserIsAdmin, checkIfEmailExists, createNewUser);
router.post('/api/v1/auth/login', validateInput(loginUserSchema, 'body'), login);
// USER ENDPOINTS
router.get('/api/v1/users', verifyToken('admin'), checkIfUserIsAdmin, cache, getUsers);
router.get('/api/v1/user/:id', verifyToken('admin'), checkIfUserIsAdmin, getAUserById);
router.delete('/api/v1/users/delete/:id', verifyToken('admin'), checkIfUserIsAdmin, deleteAUserById);
router.put('/api/v1/users/update/:id', verifyToken('admin'), checkIfUserIsAdmin, updateAUserById);
router.put('/api/v1/user/schedule/:id', verifyToken('admin'), checkIfUserIsAdmin, updateSchedule);
// PURCHASE ENDPOINTS
router.put('/api/v1/purchase/:id/:status', verifyToken('user'), checkIfProductExistsById, checkApprovalStatus, updateApprovalStatus);
router.post('/api/v1/purchase/create', validateInput(createPurchaseSchema, 'body'), verifyToken('user'), checkIfProductExistsByName, updateStockPriceAndQuantity, createPurchase);
// STOCK ENDPOINTS
router.get('/api/v1/stock', verifyToken('user'), getAnItemByName);
router.get('/api/v1/stocks', verifyToken('user'), getTotalStocks);
// SALES ENDPOINTS
router.post('/api/v1/sales/create', verifyToken('user'), checkIfProductExistsByName, createSales);
router.get('/api/v1/sales', verifyToken('user'), getTotalSales);
// REFUND ENDPOINTS
router.post('/api/v1/item/refund', verifyToken('user'), createRefunds, updateStockIfNotFaulty);
router.get('/api/v1/refunded_items', verifyToken('user'), getTotalRefunds);
export default router;
