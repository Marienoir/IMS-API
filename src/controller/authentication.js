/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import env from '../config/env';
import * as services from '../services/userServices';
import { client } from '../config/redis';
import { generateToken, validatePassword } from '../utils/index';

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

    const decodedToken = jwt_decode(refresh_token);
    client.set(decodedToken.email, refresh_token);

    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
    } else {
      res.status(200).json({
        message: 'Login successful',
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
    const { refresh_token } = req.body;
    client.set(email, refresh_token);

    if (refresh_token) {
      const user = jwt.verify(refresh_token, env.REFRESH_TOKEN);
      const token = await generateToken(user);

      res.status(200).json({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      });
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid request',
      });
    }
  } catch (error) {
    next(error);
  }
};
