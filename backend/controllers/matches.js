/**
 * Handles requests regarding matches, forwards them to FACEIT api
 */

const matchRouter = require('express').Router();
const axios = require('axios');

const Match = require('../models/match');
const Player = require('../models/player');
const statSaver = require('../utils/statSaver');
const config = require('../utils/config');
const matchParser = require('../utils/matchParser');

// const TEST_MATCH_ID = '1-09288e2a-9bf3-4e30-9f13-875ce5722997';

/**
 * Gets match with id, checks if it has already been processed
 * If not, parses stats for players that are in db and saves them
 * Stats are saved as individual documents into db
 */
matchRouter.post('/analyze', async (req, res) => {
  const matchToFind = await Match.findOne({ matchId: req.body.id });

  if (!matchToFind) {
    const timeData = await axios.get(`${config.FACEIT_MATCH_URL}/${req.body.id}`, {
      headers: {
        Authorization: config.FACEIT_API_TOKEN
      }
    });

    const timeDataParsed = timeData.data;
    const timestamp = timeDataParsed.finished_at;
    if (timestamp) {
      const matchData = await axios.get(`${config.FACEIT_MATCH_URL}/${req.body.id}/stats`, {
        headers: {
          Authorization: config.FACEIT_API_TOKEN
        }
      });

      const matchDataParsed = matchData.data;
      const playersInDb = await Player.find({});
      const parsed = matchParser(matchDataParsed, playersInDb, timestamp);
      const saved = await statSaver(parsed);

      const newMatch = new Match({
        matchId: req.body.id
      });

      await newMatch.save();
      res.json(saved);
    }
  }

  else {
    res.send('Match is already in database');
  }
});

/**
 * Gets details of a match to ease recognizing games for users in UI
 * Also checks if match is already in db for frontend button-styling
 * Might be an unnecessary API call in this or analyze? could just pass the whole data around internally
 */
matchRouter.get('/details/:id', async (req, res) => {
  const matchData = await axios.get(`${config.FACEIT_MATCH_URL}/${req.params.id}/stats`, {
    headers: {
      Authorization: config.FACEIT_API_TOKEN
    }
  });

  const roundStats = matchData.data.rounds[0].round_stats;

  const matchToFind = await Match.findOne({ matchId: req.params.id });

  if (!matchToFind) {
    const resData = {
      score: roundStats.Score,
      map: roundStats.Map,
      winner: roundStats.Winner,
      inDb: false
    };

    res.json(resData);
  } else {
    const resData = {
      score: roundStats.Score,
      map: roundStats.Map,
      winner: roundStats.Winner,
      inDb: true
    };

    res.json(resData);
  }
});

module.exports = matchRouter;