const mongoose = require('mongoose');

/**
 * Need to save these into db to avoid duplicate match processing
 * FACEIT api doesn't contain unique id's for players' stats
 */
const matchSchema = mongoose.Schema({
  matchId: {
    type: String,
    required: true
  }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;