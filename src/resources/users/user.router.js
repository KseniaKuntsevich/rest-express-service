const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.save(req.body);
    res.status(200).json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.status(200).json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    await usersService.update(user, req.body);
    res.status(200).json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    await usersService.remove(req.params.id);
    await tasksService.clearUser(req.params.id);
    res.status(204).end();
  });

module.exports = router;
