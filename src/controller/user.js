/* eslint-disable camelcase */
// import cronSchedule from '../services/cronSchedule';
import paginate from '../middleware/pagination';
import {
  deleteUserById, getAllUsers, getUserById, updateUserById, updateUserSchedule,
} from '../services/userServices';

export const getUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    const pagination = await paginate(req);
    const { limit, offset } = pagination;
    const users = await getAllUsers(limit, offset, name);

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

export const updateSchedule = async (req, res, next) => {
  try {
    const { schedule } = req.body;
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(200).json({
        code: 200,
        message: 'User does not exist',
      });
    }

    const { id, first_name } = user;
    const scheduledUser = await updateUserSchedule(schedule, id);

    return res.status(200).json({
      code: 200,
      message: `A Schedule date has been added for ${first_name} successfully`,
      data: scheduledUser,
    });
  } catch (error) {
    return next(error);
  }
};
