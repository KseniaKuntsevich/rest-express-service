const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/:boardId/tasks/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const task = await tasksService.save({
      ...req.body,
      boardId: req.params.boardId
    });
    res.status(200).json(Task.toResponse(task));
  });

router
  .route('/:boardId/tasks/:id')
  .get(async (req, res) => {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    if (!task) {
      res.status(404).end();
    } else {
      res.status(200).json(Task.toResponse(task));
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.update(req.params.id, req.body);
    res.status(200).json(Task.toResponse(task));
  })
  .delete(async (req, res) => {
    await tasksService.remove(req.params.boardId, req.params.id);
    res.status(204).end();
  });

module.exports = router;
