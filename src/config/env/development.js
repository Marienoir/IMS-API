import 'dotenv/config';

export default {
  DATABASE_URL: process.env.IMS_API_DATABASE_DEV_URL,
  NODE_ENV: process.env.IMS_API_NODE_ENV,
  ACCESS_TOKEN: process.env.IMS_API_ACCESS_SECRET,
  REFRESH_TOKEN: process.env.IMS_API_REFRESH_SECRET,
};
