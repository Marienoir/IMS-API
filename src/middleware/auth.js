/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-import-module-exports */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import env from '../config/env';
import { getUserByEmail } from '../services/userServices';

dotenv.config();

export const verifyToken = (type) => async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({
        status: 'Forbidden',
        message: 'Access Denied',
      });
    }

    const tokenValidated = jwt.verify(token, env.ACCESS_TOKEN);
    if (type === 'admin') {
      req.admin = tokenValidated;
    }
    req.user = tokenValidated;
    return next();
  } catch (err) {
    return res.status(403).json({
      status: 'Failed',
      message: 'Unable to authenticate token.',
    });
  }
};

export const checkIfUserIsAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADM') {
      return res.status(403).json({
        status: 'Forbidden',
        message: 'Access Denied',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export const checkIfEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [user] = await getUserByEmail(email);

    if (user) {
      return res.status(403).json({
        status: 'Failed',
        message: 'User Already Exists',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
