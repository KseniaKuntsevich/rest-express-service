const { boards } = require('../../db/db.client');

const getAll = async () => {
  return boards;
};

const save = async data => {
  boards.push(data);
};

const getById = async id => {
  return boards.find(board => board.id === id);
};

const update = async (board, newData) => {
  Object.assign(board, newData);
};

const remove = async id => {
  const board = await getById(id);
  const index = boards.indexOf(board);
  boards.splice(index, 1);
};

module.exports = { getAll, save, getById, update, remove };
