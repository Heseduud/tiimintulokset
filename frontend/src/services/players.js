import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/players/';

const playerService = {
  getAll: async () => {
    const res = await axios.get(baseUrl);
    return res.data;
  },
};

export default playerService;
