const mongoose = require('mongoose');

/**
 * Stores invidual stats for a player in a match
 */
const statsSchema = mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  nickname: String,
  kills: Number,
  assists: Number,
  deaths: Number,
  hs: Number,
  kr: Number,
  kd: Number,
  won: Number,
  timestamp: Number
});

const Stats= mongoose.model('Stats', statsSchema);
module.exports = Stats;