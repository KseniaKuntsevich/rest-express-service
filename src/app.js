const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { createLogger, format, transports } = require('winston');

const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'log/error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.timestamp(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: 'log/info.log',
      level: 'info',
      format: format.combine(
        format.uncolorize(),
        format.timestamp(),
        format.prettyPrint()
      )
    })
  ]
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.disable('etag');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  const { body, url, query, method } = req;

  logger.log({
    message: `${method} ${url}`,
    level: 'info',
    timestamp: new Date(),
    description: { url, body, query }
  });
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((err, req, res) => {
  const { body, url, query } = req;

  logger.log({
    status: INTERNAL_SERVER_ERROR,
    type: getStatusText(INTERNAL_SERVER_ERROR),
    message: err.message,
    level: 'error',
    timestamp: new Date(),
    description: { url, body, query }
  });

  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

module.exports = app;
