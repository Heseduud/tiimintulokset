const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const FACEIT_PLAYER_URL = 'https://open.faceit.com/data/v4/players?';
const FACEIT_MATCH_URL = 'https://open.faceit.com/data/v4/matches';
const FACEIT_MATCHHISTORY_URL = 'https://open.faceit.com/data/v4/players';
const FACEIT_API_AUTH = {
  headers: {
    'Authorization': `Bearer ${process.env.FACEIT_API_TOKEN}`
  }
};
const FACEIT_API_TOKEN = `Bearer ${process.env.FACEIT_API_TOKEN}`;

module.exports = { PORT, MONGODB_URI, FACEIT_PLAYER_URL, FACEIT_API_AUTH, FACEIT_MATCH_URL, FACEIT_MATCHHISTORY_URL, FACEIT_API_TOKEN };