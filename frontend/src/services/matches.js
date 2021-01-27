import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/matches';

const matchService = {
  getDetails: async (matchId) => {
    const res = await axios.get(`${baseUrl}/details/${matchId}`);
    return res.data;
  },
  analyzeMatch: async (matchId) => {
    const res = await axios.post(`${baseUrl}/analyze/`, { id: matchId });
    return res.data;
  },
};

export default matchService;
