import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://frontend-take-home-service.fetch.com',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5e3, 
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;