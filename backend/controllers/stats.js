/**
 * Endpoint for getting stats from db
 */

const _ = require('lodash');
const statsRouter = require('express').Router();
const Stats = require('../models/stats');

statsRouter.get('/', async (req, res) => {
  const stats = await Stats.find({});
  res.json(stats);
});

statsRouter.post('/:id', async (req, res) => {
  const start = req.body.start / 1000;
  const end = req.body.end / 1000;

  const stats = await Stats.find({
    nickname: req.params.id,
    timestamp: { $gte: start, $lte: end }
  });

  res.json(stats);
});

statsRouter.post('/graph/:name', async (req, res) => {
  const start = req.body.start / 1000;
  const end = req.body.end / 1000;
  const wantedStat = req.body.stat;

  const stats = await Stats.find({
    nickname: req.params.name,
    timestamp: { $gte: start, $lte: end }
  });

  // y for stat, x for timestamp
  const resObj = { x: [], y: [], name: req.params.name};
  _.forEach(stats, (stat) => {
    resObj.y.push(stat.kd);
    resObj.x.push(stat.timestamp);
  });

  res.json(resObj);
});

module.exports = statsRouter;