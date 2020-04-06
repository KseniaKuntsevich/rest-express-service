const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const save = data => tasksRepo.save(data);

const getById = (boardId, id) => tasksRepo.getById(boardId, id);

const update = (task, newData) => tasksRepo.update(task, newData);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

const clearUser = userId => tasksRepo.clearUser(userId);

const clearBoard = boardId => tasksRepo.clearBoard(boardId);

module.exports = {
  getAll,
  save,
  getById,
  update,
  remove,
  clearUser,
  clearBoard
};
