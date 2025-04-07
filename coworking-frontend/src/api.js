import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👈 detta hämtas från .env
});

export default api;
