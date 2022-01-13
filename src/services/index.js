/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import db from '../config/db';
import queries from '../db/queries/index.js';
import * as utils from '../utils/index.js';

export const createUser = async (body) => {
  const {
    first_name, last_name, email, image_url, phone_number, gender, password, role, deleted, status,
    reset_password_token, reset_password_expiry, verification_status, last_login,
  } = body;
  const encryptedPassword = await utils.hashPassword(password);
  const payload = [
    first_name, last_name, email, image_url, phone_number,
    gender, encryptedPassword, role, deleted, status,
    reset_password_token, reset_password_expiry, verification_status, last_login,
  ];
  return db.one(queries.addUser, payload);
};

export const getUser = (email) => db.any(queries.userLogin, email);
