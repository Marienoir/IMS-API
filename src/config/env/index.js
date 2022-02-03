import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';
import logger from '../logger';

const {
  IMS_API_PORT: PORT,
  IMS_REDIS_PORT: REDIS_PORT,
  IMS_API_NODE_ENV: NODE_ENV,
  IMS_API_ACCESS_SECRET: ACCESS_TOKEN,
  IMS_API_REFRESH_SECRET: REFRESH_TOKEN,
} = process.env;
logger.info(`Environment - ${NODE_ENV}`);
const currentEnv = {
  development,
  test,
  production,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  REDIS_PORT,
  NODE_ENV,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
};
