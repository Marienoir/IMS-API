/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import * as services from '../services/userServices';
import { client } from '../config/redis';
import { validatePassword } from '../utils/index';
import createActivityLogs from '../services/activityServices';

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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await services.getUserByEmail(email);

    const token = await validatePassword(email, password);
    const { access_token, refresh_token } = token;

    client.set('refresh_token', refresh_token);

    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
    } else {
      res.status(200).json({
        access_token,
        refresh_token,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await services.getUserByEmail(email);
    const { password } = user;
    const refresh_token = await validatePassword(email, password);
    if (!password) {
      res.status(401).json({
        status: 'fail',
        message: 'Unable to authenticate refresh token',
      });
    } else {
      res.status(200).json({
        refresh_token,
      });
    }
  } catch (error) {
    next(error);
  }
};
