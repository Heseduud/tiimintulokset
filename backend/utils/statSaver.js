const Stats = require('../models/stats');
const Player = require('../models/player');

/**
 * Finds player who the stat belongs to, saves stat with players id and concats
 * stat id to player
 * Definately not efficient, should find better way to implement
 * e.g. if we have 5 players in a match, db does 5 reads and 10 writes
 */
const saveStats = async (data) => {
  // Array for parsed stats, so we can use insertMany to reduce db operations
  const saved = [];
  for (const player of data) {
    // Match player from match with player in db
    // const playerInDb = _.find(playersInDb, (p) => { return p.username === player.nickname; });
    const playerInDb = await Player.findOne({ username: player.nickname });

    const statObj = new Stats(
      {
        ...player,
        player: playerInDb._id
      }
    );

    const savedStat = await statObj.save();
    playerInDb.stats = playerInDb.stats.concat(savedStat._id);
    await playerInDb.save();
    saved.push(savedStat);
  }
  return saved;
};

module.exports = saveStats;