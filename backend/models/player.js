const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  playerId: {
    type: String,
    required: true
  },
  stats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stats'
    }
  ]
});

const Player = mongoose.model('User', playerSchema);
module.exports = Player;