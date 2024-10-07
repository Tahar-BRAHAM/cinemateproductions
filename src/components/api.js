import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Adjust based on how you store the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token)
  }
  return config;
});

export default api;
