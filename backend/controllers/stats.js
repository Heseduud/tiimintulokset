/**
 * Endpoint for getting stats from db,
 * Initially just for all stats
 */

const statsRouter = require('express').Router();
const Stats = require('../models/stats');

statsRouter.get('/', async (req, res) => {
  const stats = await Stats.find({});
  res.json(stats);
});

statsRouter.get('/:id', async (req, res) => {
  const stats = await Stats.find({nickname: req.params.id});
  res.json(stats);
});

module.exports = statsRouter;