/**
 * Endpoint for getting stats from db
 */

const statsRouter = require('express').Router();
const Stats = require('../models/stats');

statsRouter.get('/', async (req, res) => {
  const stats = await Stats.find({});
  res.json(stats);
});

statsRouter.post('/:id', async (req, res) => {
  const start = req.body.start / 1000;
  const end = req.body.end / 1000;

  console.log(start, end);
  const stats = await Stats.find({
    nickname: req.params.id,
    timestamp: { $gte: start, $lte: end }
  });
  console.log(stats);
  res.json(stats);
});

module.exports = statsRouter;