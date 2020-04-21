const User = require('./user.model');

const getAll = async () => {
  return await User.find({});
};

const save = async data => {
  return await User.create(data);
};

const getById = async id => {
  return await User.findOne({ _id: id });
};

const update = async (user, newData) => {
  return await User.updateOne({ _id: newData.id }, newData);
};

const remove = async id => {
  return await User.deleteOne({ _id: id });
};

module.exports = { getAll, save, getById, update, remove };
