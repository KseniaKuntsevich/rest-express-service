const Board = require('./board.model');
const db = [new Board()];

const getAll = async () => {
  return db;
};

const save = async data => {
  db.push(data);
};

const getById = async id => {
  return db.find(board => board.id === id);
};

const update = async (board, newData) => {
  Object.assign(board, newData);
};

const remove = async id => {
  const board = await getById(id);
  const index = db.indexOf(board);
  db.splice(index, 1);
};

module.exports = { getAll, save, getById, update, remove };
