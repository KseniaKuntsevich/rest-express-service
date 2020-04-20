const { tasks } = require('../../db/db.client');

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const save = async data => {
  await tasks.push(data);
};

const getById = async (boardId, id) => {
  return tasks.find(task => task.id === id && boardId === task.boardId);
};

const update = async (task, newData) => {
  await Object.assign(task, newData);
};

const remove = async (boardId, id) => {
  const task = await getById(boardId, id);
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
};

const clearUser = async userId => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
};

const clearBoard = async boardId => {
  tasks.forEach(task => {
    if (task.boardId === boardId) {
      remove(boardId, task.id);
    }
  });
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
