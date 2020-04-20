const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      default: ''
    },
    boardId: {
      type: String,
      default: ''
    },
    columnId: {
      type: String,
      default: ''
    }
  }
  // , { versionKey : false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
