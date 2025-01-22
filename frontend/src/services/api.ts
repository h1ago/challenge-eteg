import axios from 'axios';

export const baseURL = 'http://localhost:3000/';

const api = axios.create({
  baseURL,
});

export default api;
