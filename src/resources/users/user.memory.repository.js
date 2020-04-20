const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const save = async data => {
  return User.create(data);
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const update = async (user, newData) => {
  return User.updateOne({ _id: newData.id }, newData);
};

const remove = async id => {
  return (await User.deleteOne({ _id: id })).deleteCount;
};

module.exports = { getAll, save, getById, update, remove };
