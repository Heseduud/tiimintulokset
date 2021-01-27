/**
 * Handles requests regarding players, forwards them to FACEIT api if player is not found etc.
 */

const playerRouter = require('express').Router();
const request = require('request');
const _ = require('lodash');

const Player = require('../models/player');
const config = require('../utils/config');

playerRouter.get('/', async (_req, res) => {
  const players = await Player.find({});
  res.json(players);
});

// test player id: 788da801-a3da-4cc6-87db-acbb612e9bb7
// test url: localhost:3001/api/players/matchHistory/788da801-a3da-4cc6-87db-acbb612e9bb7
playerRouter.get('/matchHistory/:id', async (req, res) => {
  const MATCHHISTORYURL = `${config.FACEIT_MATCHHISTORY_URL}/${req.params.id}/history?game=csgo&offset=0&limit=20`;
  console.log(MATCHHISTORYURL);

  request.get({ ...config.FACEIT_API_AUTH, url: MATCHHISTORYURL }, async (err, response, body) => {
    if (err) {
      console.error(err);
    }

    const data = JSON.parse(body);
    const parsedHistory = [];
    _.forEach(data.items, (match) => {
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
});

playerRouter.get('/findByUsername/:username', async (req, res) => {
  const playerToFind = await Player.findOne({ username: req.params.username });

  // If player isn't found, get it from FACEIT api and save into db
  if (!playerToFind) {
    request.get({ ...config.FACEIT_API_AUTH, url: `${config.FACEIT_PLAYER_URL}nickname=${req.params.username}` }, async (err, response, body) => {
      if (err) {
        console.error(err);
      }

      const data = JSON.parse(body);
      const newPlayer = new Player({
        username: data.nickname,
        playerId: data.player_id,
      });

      const savedUser = await newPlayer.save();
      res.json(savedUser);
    });
  }
  res.json(playerToFind);
});

module.exports = playerRouter;