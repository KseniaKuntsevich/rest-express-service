const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const save = async data => {
  return Task.create(data);
};

const getById = async (boardId, id) => {
  return Task.findOne({ _id: id, boardId });
};

const update = async (task, newData) => {
  return Task.updateOne({ _id: newData.id }, newData);
};

const remove = async (boardId, id) => {
  return (await Task.deleteOne({ _id: id, boardId })).deleteCount;
};

const clearUser = async userId => {
  return Task.deleteMany({ userId });
};

const clearBoard = async boardId => {
  return Task.deleteMany({ boardId });
};

module.exports = {
  getAll,
  save,
  getById,
  update,
  remove,
  clearUser,
  clearBoard
};
