const _ = require('lodash');

// Really inefficient, should find a better way to do this, atleast w/o double foreach
const parseMatch = (data, playersInDb, timestamp) => {
  const teams = data.rounds[0].teams;
  const dbPlayerInMatch = [];

  _.forEach(teams, (team) => {
    const playersInTeam = team.players;
    _.forEach(playersInTeam, (player) => {
      const playerObj = {
        nickname: player.nickname,
        kills: player.player_stats.Kills,
        assists: player.player_stats.Assists,
        deaths: player.player_stats.Deaths,
        hs: player.player_stats['Headshots %'],
        kr: player.player_stats['K/R Ratio'],
        kd: player.player_stats['K/D Ratio'],
        won: player.player_stats.Result,
        timestamp: timestamp
      };

      if (playersInDb.some(el => el.username === playerObj.nickname)) {
        dbPlayerInMatch.push(playerObj);
      }
    });
  });

  return dbPlayerInMatch;
};

module.exports = parseMatch;