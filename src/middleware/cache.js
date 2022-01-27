/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { client } from '../config/redis';

export const cache = async (req, res, next) => {
  const value = await client.get('users');
  const data = JSON.parse(value);

  if (value !== null) {
    return res.status(200).json({
      code: 200,
      message: 'All Users Gotten successfully',
      data,
    });
  }
  return next();
};

export const refreshCache = async (req, res, next) => {
  const refresh_token = await client.get('refresh_token');
  if (refresh_token !== null) {
    req.body.refresh_token = refresh_token;
  }
  return next();
};
