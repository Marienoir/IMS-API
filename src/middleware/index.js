/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-import-module-exports */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({
        status: 'Forbidden',
        message: 'Access Denied',
      });
    }

    const tokenValidated = jwt.verify(token, process.env.IMS_API_TOKEN_KEY);
    req.token = tokenValidated;
    return next();
  } catch (err) {
    res.status(403).json({
      status: 'Failed',
      message: 'Unable to authenticate token.',
    });
    return next(err);
  }
};

export default verifyToken;
