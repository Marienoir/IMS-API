import cron from 'node-cron';

const cronJob = () => {
  cron.schedule('* * * * *', () => {
    console.log('Cron Job Schedule is running a task every minute');
  });
};

export default cronJob;
