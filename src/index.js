/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cronJob from './services/cronJob';
import db from './config/db';
import route from './router';
import env from './config/env';

dotenv.config();

const app = express();
const port = env.PORT;

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
    message: 'Welcome to IMS',
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
  res.status(400).json({
    status: 'Failed',
    message: err.message,

  });
});

db.connect()
  .then((obj) => {
    app.listen(port, () => {
      obj.done();
      cronJob();
      console.log(`Starting on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

export default app;
