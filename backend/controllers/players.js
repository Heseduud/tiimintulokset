/**
 * Handles requests regarding players, forwards them to FACEIT api if player is not found etc.
 */

const playerRouter = require('express').Router();
const axios = require('axios');
const _ = require('lodash');

const Player = require('../models/player');
const config = require('../utils/config');

playerRouter.get('/', async (_req, res) => {
  const players = await Player.find({});
  res.json(players);
});

playerRouter.get('/matchHistory/:id', async (req, res) => {
  const MATCHHISTORYURL = `${config.FACEIT_MATCHHISTORY_URL}/${req.params.id}/history?game=csgo&offset=0&limit=20`;

  const playerData = await axios.get(MATCHHISTORYURL, {
    headers: {
      Authorization: config.FACEIT_API_TOKEN
    }
  });

  const parsedHistory = [];
  _.forEach(playerData.data.items, (match) => {
    const resObj = {
      id: match.match_id,
      finished: match.finished_at,
      teams: {
        faction1: match.teams.faction1.nickname,
        faction2: match.teams.faction2.nickname
      },
      winner: match.results.winner
    };
    parsedHistory.push(resObj);
  });

  res.json(parsedHistory);
});

playerRouter.get('/info/:username', async (req, res) => {
  // If player name changes this doesn't work(?) need to test / find solution
  const playerToFind = await Player.findOne({ username: req.params.username });

  if (!playerToFind) {
    try {
      const playerData = await axios.get(`${config.FACEIT_PLAYER_URL}nickname=${req.params.username}`, {
        headers: {
          Authorization: config.FACEIT_API_TOKEN
        }
      });
      
      res.send(playerData.data);
    } catch (e) {
      console.log(e);
    }

  } else {
    res.status(403).send('Player is already in db');
  }
});

playerRouter.post('/add', async (req, res) => {
  const newPlayer = new Player({
    username: req.body.username,
    playerId: req.body.playerId
  });

  const saved = await newPlayer.save();
  res.json(saved);
});

module.exports = playerRouter;