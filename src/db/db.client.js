const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const boards = [];
const tasks = [];
const users = [];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("we're connected!");
    await db.dropDatabase();
    cb();
  });
};

module.exports = { tasks, boards, users, connectToDB };
