const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const board = new Board(req.body);
    await boardsService.save(board);
    res.json(board);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    res.json(board);
  })
  .put(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    boardsService.update(board, req.body);
    res.json(board);
  })
  .delete(async (req, res) => {
    boardsService.remove(req.params.id);
    res.status(204).end();
  });

module.exports = router;
