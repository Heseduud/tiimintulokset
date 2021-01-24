/**
 * Handles requests regarding players, forwards them to FACEIT api if player is not found etc.
 */

const playerRouter = require('express').Router();
const request = require('request');
const url = require('url');
const querystring = require('querystring');
const _ = require('lodash');

const Player = require('../models/player');
const config = require('../utils/config');

playerRouter.get('/', async (_req, res) => {
  const players = await Player.find({});
  res.json(players);
});

// test player id: 788da801-a3da-4cc6-87db-acbb612e9bb7
// test url: localhost:3000/api/players/matchHistory?id=788da801-a3da-4cc6-87db-acbb612e9bb7&from=1605139200
// TODO: parse matchhistory into object and pass it to res.json, maybe need map from match? idk we'll see
playerRouter.get('/matchHistory/', async (req, res) => {
  const url_parts = url.parse(req.url, true);
  console.log(url_parts);
  const urlQuery = querystring.parse(url_parts.query);
  console.log(urlQuery);
  const MATCHHISTORYURL = `${config.FACEIT_MATCHHISTORY_URL}/${url_parts.query.id}/history?game=csgo&from=${url_parts.query.from}%offset=08&limit=20`;
  console.log(MATCHHISTORYURL);

  request.get({ ...config.FACEIT_API_AUTH, url: MATCHHISTORYURL }, async (err, response, body) => {
    if (err) {
      console.error(err);
    }

    const data = JSON.parse(body);
    _.forEach(data.items, (match) => {
      console.log(match.match_id);
      console.log(match.finished_at);
    });
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