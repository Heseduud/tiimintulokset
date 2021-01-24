/**
 * Handles requests regarding matches, forwards them to FACEIT api
 */

const matchRouter = require('express').Router();
const request = require('request');
const axios = require('axios');

const Match = require('../models/match');
const Player = require('../models/player');
const statSaver = require('../utils/statSaver');
const config = require('../utils/config');
const matchParser = require('../utils/matchParser');

const TEST_MATCH_ID = '1-09288e2a-9bf3-4e30-9f13-875ce5722997';

/**
 * Gets match with id, checks if it has already been processed
 * If not, parses stats for players that are in db and saves them
 * Stats are saved as individual documents into db
 */
matchRouter.get('/:id', async (req, res) => {
  const matchToFind = await Match.findOne({ matchId: req.params.id });

  if (!matchToFind) {
    const timeData = await axios.get(`${config.FACEIT_MATCH_URL}/${req.params.id}`, {
      headers: {
        Authorization: config.FACEIT_API_TOKEN
      }
    });
    const timeDataParsed = timeData.data;
    const timestamp = timeDataParsed.finished_at;
    if (timestamp) {
      const matchData = await axios.get(`${config.FACEIT_MATCH_URL}/${req.params.id}/stats`, {
        headers: {
          Authorization: config.FACEIT_API_TOKEN
        }
      });
      const matchDataParsed = matchData.data;
      const playersInDb = await Player.find({});
      const parsed = matchParser(matchDataParsed, playersInDb, timestamp);
      const saved = await statSaver(parsed);

      const newMatch = new Match({
        matchId: req.params.id
      });
      await newMatch.save();
      res.json(saved);
    }
  }
 
  // if (!matchToFind) {
  //   let timestamp = 0;
  //   // Need timestamp of match from different endpoint than stats, idk why, ask faceit
  //   request.get({...config.FACEIT_API_AUTH, url:`${config.FACEIT_MATCH_URL}/${req.params.id}`},
  //     async (err, response, body) => {
  //       if (err) {
  //         console.error(err);
  //       }

  //       const data = JSON.parse(body);
  //       // Timestamp in UNIX format
  //       timestamp = data.finished_at;
  //     });
    
  //   request.get({...config.FACEIT_API_AUTH, url:`${config.FACEIT_MATCH_URL}/${req.params.id}/stats`},
  //     async (err, response, body) => {
  //       // Find players in db
  //       const playersInDb = await Player.find({});

  //       if (err) {
  //         console.error(err);
  //       }

  //       const data = JSON.parse(body);
  //       console.log(data.rounds[0].teams);
  //       console.log(data.rounds[0].round_stats);
  //       const parsed = matchParser(data, playersInDb, timestamp);
  //       const saved = await statSaver(parsed);
  //       const newMatch = new Match({
  //         matchId: req.params.id
  //       });
  //       await newMatch.save();
  //       res.json(saved);
  //       res.json(parsed);
  //     });
  // }
  else {
    res.send('Match is already in database');
  }
});

module.exports = matchRouter;