/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { client } from '../config/redis';

const cache = async (req, res, next) => {
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
    return res.status(200).json({
      refresh_token,
    });
  }
  return next();
};

export default cache;
