const db = [];

const getAll = async () => {
  return db;
};

const save = async data => {
  await db.push(data);
};

const getById = async id => {
  return db.find(task => task.id === id);
};

const update = async (task, newData) => {
  await Object.assign(task, newData);
};

const remove = async id => {
  const task = await getById(id);
  const index = db.indexOf(task);
  db.splice(index, 1);
};

module.exports = { getAll, save, getById, update, remove };
