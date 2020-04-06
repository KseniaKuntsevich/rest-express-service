const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const save = data => boardsRepo.save(data);

const getById = id => boardsRepo.getById(id);

const update = (board, newData) => boardsRepo.update(board, newData);

const remove = id => boardsRepo.remove(id);

module.exports = { getAll, save, getById, update, remove };
