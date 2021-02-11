import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/players/';

const playerService = {
  getAll: async () => {
    const res = await axios.get(baseUrl);
    return res.data;
  },
  getHistory: async (playerId) => {
    const res = await axios.get(`${baseUrl}/matchHistory/${playerId}`);
    return res.data;
  },
  getPlayerInfo: async (username) => {
    try {
      const res = await axios.get(`${baseUrl}/info/${username}`);
      return res.data;
    } catch (e) {
      // TODO: error handle
      console.log(e);
      return '404';
    }
  },
  addPlayer: async (username, playerId) => {
    // Returns 403 if user in db or 404 if not found --> catch error
    try {
      const res = await axios.post(`${baseUrl}/add`, { username, playerId });
      return res.data;
    } catch (e) {
      console.log(`caught error : ${e}`);
      return null;
    }
  },
};

export default playerService;
