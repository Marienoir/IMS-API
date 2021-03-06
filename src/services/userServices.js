/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import db from '../config/db';
import authQueries from '../db/queries/authentication.js';
import userQueries from '../db/queries/user';
import * as utils from '../utils/index.js';

export const createUser = async (body) => {
  const encryptedPassword = await utils.hashPassword(body.password);
  const payload = [
    body.first_name, body.last_name, body.email, body.image_url, body.phone_number,
    body.gender, encryptedPassword, body.role, body.deleted, body.status,
    body.reset_password_token, body.reset_password_expiry,
    body.verification_status, body.last_login,
  ];
  return db.one(authQueries.addUser, payload);
};

export const createAdmin = async (body) => {
  const encryptedPassword = await utils.hashPassword(body.password);
  const payload = [
    body.first_name, body.last_name, body.email, body.image_url, body.phone_number,
    body.gender, encryptedPassword, body.role, body.deleted, body.status,
    body.reset_password_token, body.reset_password_expiry,
    body.verification_status, body.last_login,
  ];
  return db.one(authQueries.addAdmin, payload);
};

export const getUserByEmail = (email) => db.oneOrNone(authQueries.getUserByEmail, email);

export const getAllUsers = (limit, offset, all, search = '') => {
  if (search) {
    return db.any(userQueries.searchUserByFirstName, search);
  }
  if (all) {
    return db.any(userQueries.getAllUsers);
  }
  return db.any(userQueries.getPaginatedUsers, [limit, offset]);
};

export const getUserById = async (id) => db.oneOrNone(userQueries.getUserById, [id]);

export const deleteUserById = async (id, deleted) => db.none(userQueries.deleteUserById, [id, deleted]);

export const updateUserById = async (id, body) => {
  const encryptedPassword = await utils.hashPassword(body.password);
  return db.one(userQueries.updateUserById, [body.first_name, body.last_name, body.email, body.image_url, body.phone_number,
    body.gender, encryptedPassword, body.role, body.deleted, body.status, id]);
};

export const getUserByFirstName = (first_name) => db.any(userQueries.searchUserByFirstName, first_name);

export const updateStatus = async (id, status) => db.any(userQueries.updateUserStatus, [id, status]);

export const updateUserSchedule = async (schedule, id) => db.any(userQueries.alterUserSchedule, [schedule, id]);

export const deactivateUserStatus = async (status, id) => db.any(userQueries.deactivateUserStatus, [status, id]);

export const activateUserStatus = async (status, id) => db.any(userQueries.activateUserStatus, [status, id]);
