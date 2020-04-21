const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const save = data => usersRepo.save(data);

const getById = id => usersRepo.getById(id);

const update = (user, newData) => usersRepo.update(user, newData);

const remove = id => usersRepo.remove(id);

module.exports = { getAll, save, getById, update, remove };
