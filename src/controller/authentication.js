import dotenv from 'dotenv';
import * as services from '../services/userServices';
import { validatePassword } from '../utils/index';

dotenv.config();

export const createNewUser = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await services.createUser(body);
    return res.status(201).json({
      code: 201,
      data,
      message: 'User created successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const logUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await services.getUserByEmail(email);

    const token = await validatePassword(email, password);
    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'User is authenticated ',
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};
