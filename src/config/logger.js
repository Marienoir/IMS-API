import winston from 'winston';
import fs from 'fs';
import config from './env';

const {
  combine, label, timestamp, colorize, printf,
} = winston.format;
const getLogToProcess = (env, fileOpt, consoleOpt) => {
  const array = [];
  if (env === 'development' || env === 'test') {
    array.push(
      new winston.transports.File(fileOpt),
      new winston.transports.Console(consoleOpt),
    );
    return array;
  }
  array.push(
    new winston.transports.File(fileOpt),
    new winston.transports.Console(consoleOpt),
  );
  return array;
};
class Logger {
  constructor(options) {
    this.logDir = options.logDirPath || `${config.rootPath}/logs`;
    this.label = options.label || 'log';
    this.commonOptions = {
      console: {
        level: 'debug',
        handleExceptions: true,
        format: combine(
          colorize({ all: true }),
          printf(
            (msg) => `[${new Date(msg.timestamp).toUTCString()}]: ${msg.label} : - ${
              msg.level
            }: ${msg.message}`,
          ),
        ),
      },
      file: {
        level: 'debug',
        filename: `${this.logDir}/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 2000,
        format: winston.format.json(),
      },
    };
    this.debugMode = options.debugMode === true || options.debugMode === undefined;
    this.environment = config.NODE_ENV || 'development';
  }

  getTransports() {
    const { console, file } = this.commonOptions;
    let level = this.debugMode ? 'debug' : 'info';
    if (this.environment === 'production' && this.debugMode) level = 'error';
    const consoleOpt = { ...console, level };
    const fileOpt = {
      ...file,
      filename: `${this.logDir}/app.${this.environment}.log`,
    };
    const logToProcess = getLogToProcess(this.environment, fileOpt, consoleOpt);
    return logToProcess;
  }

  init() {
    if (!fs.existsSync(this.logDir)) fs.mkdirSync(this.logDir);
    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        label({
          label: this.label,
        }),
      ),
      transports: this.getTransports(),
      exitOnError: false,
    });
    logger.stream = {
      write(message) {
        logger.info(message);
      },
    };
    return logger;
  }

  static createLogger(options) {
    const loggerInstance = new Logger(options);
    return loggerInstance.init();
  }
}
export default Logger;
