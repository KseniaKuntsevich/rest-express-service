const mongoose = require('mongoose');
const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');

const boards = [new Board()];
const tasks = [];
const users = [new User({ name: 'user1', login: 'log', password: 'pass' })];

const connectToDB = cb => {
  mongoose.connect(
    'mongodb+srv://admin:admin@cluster0-quoxp.mongodb.net/rest?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
    db.dropDatabase();
    users.forEach(user => user.save());
    cb();
  });
};

module.exports = { tasks, boards, users, connectToDB };
