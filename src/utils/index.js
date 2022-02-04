/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as services from '../services/userServices';
import env from '../config/env';

export const hashPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

export const generateToken = (user) => {
  const access_token = jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      status: user.status,
    },
    env.ACCESS_TOKEN,
    {
      expiresIn: '1hr',
    },
  );

  const refresh_token = jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      status: user.status,
    },
    env.REFRESH_TOKEN,
    {
      expiresIn: '24hr',
    },
  );

  return { access_token, refresh_token };
};

export const comparePassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid;
};

export const validatePassword = async (email, password) => {
  const user = await services.getUserByEmail(email);
  if (user) {
    const isValid = await comparePassword(password, user.password);
    if (isValid) {
      const token = await generateToken({
        user_id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        status: user.status,
      });
      return token;
    }
  }
  return false;
};
