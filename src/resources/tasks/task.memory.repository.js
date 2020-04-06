const db = [];

const getAll = async boardId => {
  return db.filter(task => task.boardId === boardId);
};

const save = async data => {
  await db.push(data);
};

const getById = async (boardId, id) => {
  return db.find(task => task.id === id && boardId === task.boardId);
};

const update = async (task, newData) => {
  await Object.assign(task, newData);
};

const remove = async (boardId, id) => {
  const task = await getById(boardId, id);
  const index = db.indexOf(task);
  db.splice(index, 1);
};

const clearUser = async userId => {
  db.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
};

const clearBoard = async boardId => {
  db.forEach(task => {
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
