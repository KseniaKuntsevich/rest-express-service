const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { PORT } = require('./common/config');
const { logInfo, logError } = require('./logger/index');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

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

  logInfo(`${method} ${url}`, { url, body, query });

  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((error, req, res) => {
  const { body, url, query } = req;
  logError(error, { url, body, query });
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

process.on('uncaughtException', (error, origin) => {
  logError(error, origin);
  app.listen(PORT);
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  logError(error, origin);
  app.listen(PORT);
});

process.on('unhandledRejection', reason => {
  logError(reason, 'unhandledRejection');
});

// check Rejection
// Promise.reject(Error('Oops! Rejection'));

// ceck Exeption
// throw Error('Oops! Exeption');

module.exports = app;
