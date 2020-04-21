const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const board = await boardsService.save(req.body);
    res.status(200).json(Board.toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      res.status(404).send('Board is not found');
    }
  })
  .put(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      res.status(404).send('Board is not found');
    }
  })
  .delete(async (req, res) => {
    await boardsService.remove(req.params.id);
    await tasksService.clearBoard(req.params.id);
    res.status(204).end();
  });

module.exports = router;
