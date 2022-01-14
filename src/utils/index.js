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
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      status: user.status,
    },
    env.IMS_API_TOKEN_KEY,
    {
      expiresIn: '2hr',
    },
  );
  return token;
};

export const comparePassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid;
};

export const validatePassword = async (email, password) => {
  const user = await services.getUserByEmail(email);

  if (user.length === 1) {
    const isValid = await comparePassword(password, user[0].password);

    if (isValid) {
      const token = await generateToken({
        id: user[0].id,
        email: user[0].email,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        role: user[0].role,
        status: user[0].status,
      });
      return token;
    }
  }
  return false;
};
