const Board = require('./board.model');

const getAll = async () => {
  return await Board.find({});
};

const save = async data => {
  return await Board.create(data);
};

const getById = async id => {
  return await Board.findOne({ _id: id });
};

const update = async (id, newData) => {
  return await Board.updateOne({ _id: id }, newData);
};

const remove = async id => {
  return await Board.deleteOne({ _id: id });
};

module.exports = { getAll, save, getById, update, remove };
