const mongoose = require('mongoose');
// const Board = require('../resources/boards/board.memory.repository').save;
// const serSave = require('../resources/users/user.memory.repository').save;

const boards = [
  {
    id: '0',
    title: 'Board',
    columns: []
  }
];
const tasks = [];
const users = [
  {
    id: '0',
    name: 'User',
    login: 'User',
    password: 'User'
  }
];

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
  db.once('open', async () => {
    console.log("we're connected!");
    await db.dropDatabase();
    // users.forEach(d => User.save(d));
    // boards.forEach(d => Board.save(d));
    cb();
  });
};

module.exports = { tasks, boards, users, connectToDB };
