/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import cron from 'node-cron';
import {
  activateUserStatus,
  deactivateUserStatus,
} from './userServices';

export const deactivateCronSchedule = () => {
  cron.schedule('59 59 23 * * 5', async () => {
    const inactiveuser = await deactivateUserStatus();
    console.log(inactiveuser);
    console.log('User has been deactivated');
  });
};

export const activateCronSchedule = () => {
  cron.schedule('59 59 23 * * 7', async () => {
    const activeuser = await activateUserStatus();
    console.log(activeuser);
    console.log('User has been Activated');
  });
};
