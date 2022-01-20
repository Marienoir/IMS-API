import cron from 'node-cron';
import { updateStatus } from './userServices';

const cronSchedule = () => {
  cron.schedule('59 59 23 * * *', () => {
    const currentTime = new Date().toLocaleString();
    updateStatus();
    console.log(`All inactive users have been updated at ${currentTime}`);
  });
};

export default cronSchedule;
