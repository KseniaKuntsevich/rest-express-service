const { createLogger, format, transports } = require('winston');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'src/logger/error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.timestamp(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: 'src/logger/info.log',
      level: 'info',
      format: format.combine(
        format.uncolorize(),
        format.timestamp(),
        format.prettyPrint()
      )
    })
  ]
});

const logError = (err, description = '') => {
  const errorMessage = err.message || '';
  const mess = ['Status', INTERNAL_SERVER_ERROR, err.message].join(' ');
  logger.log({
    level: 'error',
    status: INTERNAL_SERVER_ERROR,
    type: getStatusText(INTERNAL_SERVER_ERROR),
    errorMessage,
    message: mess,
    timestamp: new Date(),
    description
  });
};

const logInfo = (message = '', description = '') => {
  logger.log({
    level: 'info',
    message,
    timestamp: new Date(),
    description
  });
};

module.exports = { logError, logInfo };
