/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import cron from 'node-cron';
import logger from '../config/logger';
import {
  activateUserStatus,
  deactivateUserStatus,
  getUserById,
} from './userServices';

const dateToCron = (date) => {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours() - 1;
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  return `${seconds} ${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};

export const cronJobSchedule = async (req) => {
  const { schedule } = req.body;
  const { id } = req.params;
  const user = await getUserById(id);
  const { first_name, last_name } = user;
  const date = new Date(schedule);
  const cronDate = dateToCron(date);

  if (user.status === 'active') {
    cron.schedule(cronDate, async () => {
      await deactivateUserStatus(id);
      logger.info(`${first_name} ${last_name} has been deactivated}`);
    });
  } else {
    cron.schedule(cronDate, async () => {
      await activateUserStatus(id);
      logger.info(`${first_name} ${last_name} has been activated`);
    });
  }
};

export const activateCronSchedule = () => {
  cron.schedule('10 42 9 * * *', async () => {
    const activeuser = await activateUserStatus();
    console.log(activeuser);
    console.log('User has been Activated');
  });
};
