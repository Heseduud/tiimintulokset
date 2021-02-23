import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/stats/';

export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const statService = {
  getAll: async () => {
    const res = await axios.get(baseUrl);
    return res.data;
  },
  getOne: async (name, start, end) => {
    const res = await axios.post(`${baseUrl}/${name}`, { start, end });
    return res.data;
  },
  getOnePlotly: async (name, start, end, wantedStat) => {
    const res = await axios.post(`${baseUrl}/graph/${name}`, { start, end, wantedStat });
    return res.data;
  },
};

export default statService;
