/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './config/logger';
import db from './config/db';
import route from './router';
import env from './config/env';
import { activateCronSchedule, deactivateCronSchedule } from './services/cronSchedule';
import { connectRedis } from './config/redis/index';

dotenv.config();
const port = env.PORT;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: '*',
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({
    code: 200,
    status: 'Success',
    message: 'Welcome to Inventory Management System',
  });
});

app.use(route);

// ERROR HANDLING
app.use((req, res) => {
  res.status(404).json({
    status: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({
    status: 'Failed',
    message: err.message,

  });
});

connectRedis();

db.connect()
  .then((obj) => {
    app.listen(port, () => {
      obj.done();
      activateCronSchedule();
      deactivateCronSchedule();
      logger.info(`Starting on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

export default app;
