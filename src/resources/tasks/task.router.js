const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/:id/tasks/')
  .get(async (req, res) => {
    const task = await tasksService.getAll();
    res.json(task);
  })
  .post(async (req, res) => {
    const task = new Task({ ...req.body, boardId: req.params.id });
    await tasksService.save(task);
    res.json(task);
  });

router
  .route('/:id/tasks/:id')
  .get(async (req, res) => {
    const task = await tasksService.getById(req.params.id);
    res.json(task);
  })
  .put(async (req, res) => {
    const task = await tasksService.getById(req.params.id);
    tasksService.update(task, req.body);
    res.json(task);
  })
  .delete(async (req, res) => {
    tasksService.remove(req.params.id);
    res.status(204).end();
  });

module.exports = router;
