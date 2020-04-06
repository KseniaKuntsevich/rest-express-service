const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const save = data => tasksRepo.save(data);

const getById = id => tasksRepo.getById(id);

const update = (task, newData) => tasksRepo.update(task, newData);

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, save, getById, update, remove };
