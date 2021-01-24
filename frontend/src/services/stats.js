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
  getOne: async (name) => {
    const res = await axios.get(`${baseUrl}/${name}`);
    return res.data;
  },
};

export default statService;
