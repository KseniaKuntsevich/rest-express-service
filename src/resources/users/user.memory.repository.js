const User = require('./user.model');
const db = [new User()];

const getAll = async () => {
  return db;
};

const save = async data => {
  await db.push(data);
};

const getById = async id => {
  return db.find(user => user.id === id);
};

const update = async (user, newData) => {
  await Object.assign(user, newData);
};

const remove = async id => {
  const user = await getById(id);
  const index = db.indexOf(user);
  db.splice(index, 1);
};

module.exports = { getAll, save, getById, update, remove };
