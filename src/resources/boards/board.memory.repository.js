const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const save = async data => {
  return Board.create(data);
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const update = async (board, newData) => {
  return Board.updateOne({ _id: newData.id }, newData);
};

const remove = async id => {
  return (await Board.deleteOne({ _id: id })).deleteCount;
};

module.exports = { getAll, save, getById, update, remove };
