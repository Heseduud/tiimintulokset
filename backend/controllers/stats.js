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
  const wantedStat = req.body.wantedStat;

  const stats = await Stats.find({
    nickname: req.params.name,
    timestamp: { $gte: start, $lte: end }
  });

  // Converts unix timestamp to YYYY-MM-DD format
  const convertDate = (unix) => {
    const date = new Date(unix*1000);
    const dateString = date.toISOString();
    return `${dateString.slice(0, 10)} ${dateString.slice(11, 19)}`;
  };

  // y for stat, x for timestamp
  const resObj = { x: [], y: [], name: req.params.name};
  _.forEach(stats, (stat) => {
    resObj.y.push(stat[wantedStat]);
    resObj.x.push(convertDate(stat.timestamp));
  });

  res.json(resObj);
});

module.exports = statsRouter;