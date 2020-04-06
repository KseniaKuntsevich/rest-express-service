const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/:boardId/tasks/')
  .get(async (req, res) => {
    const task = await tasksService.getAll(req.params.boardId);
    res.json(task);
  })
  .post(async (req, res) => {
    const task = new Task({ ...req.body, boardId: req.params.boardId });
    await tasksService.save(task);
    res.json(task);
  });

router
  .route('/:boardId/tasks/:id')
  .get(async (req, res) => {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    if (!task) {
      res.status(404).end();
    } else {
      res.json(task);
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    tasksService.update(task, req.body);
    res.json(task);
  })
  .delete(async (req, res) => {
    tasksService.remove(req.params.boardId, req.params.id);
    res.status(204).end();
  });

module.exports = router;
