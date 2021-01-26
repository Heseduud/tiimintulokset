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
};

export default playerService;
