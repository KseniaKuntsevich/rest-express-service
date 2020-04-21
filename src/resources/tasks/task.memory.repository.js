const Task = require('./task.model');

const getAll = async boardId => {
  return await Task.find({ boardId });
};

const save = async data => {
  return await Task.create(data);
};

const getById = async (boardId, id) => {
  return await Task.findOne({ _id: id, boardId });
};

const update = async (id, newData) => {
  return await Task.updateOne({ _id: id }, newData);
};

const remove = async (boardId, id) => {
  return await Task.deleteOne({ _id: id, boardId });
};

const clearUser = async userId => {
  return await Task.updateMany({ userId }, { userId: null });
};

const clearBoard = async boardId => {
  return await Task.deleteMany({ boardId });
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
