/* eslint-disable camelcase */
import dotenv from 'dotenv';
import {
  deleteUserById, getAllUsers, getUserByFirstName, getUserById, updateUserById,
} from '../services/userServices';

dotenv.config();

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({
      code: 200,
      message: 'All Users Gotten successfully',
      users,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAUserById = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    if (user) {
      return res.status(200).json({
        code: 200,
        message: `User ${req.params.id} Gotten successfully`,
        data: user,
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'User Does Not Exist',
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteAUserById = async (req, res, next) => {
  try {
    await deleteUserById(req.params.id);

    return res.status(200).json({
      code: 200,
      message: 'User Deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const updateAUserById = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    const { id } = user;
    const newUser = await updateUserById(
      id,
      req.body,
    );

    return res.status(200).json({
      code: 200,
      message: 'User Updated successfully',
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const searchUserByName = async (req, res, next) => {
  try {
    const user = await getUserByFirstName(req.query.name);

    return res.status(200).json({
      code: 200,
      message: 'User Gotten successfully',
      user,
    });
  } catch (error) {
    return next(error);
  }
};
