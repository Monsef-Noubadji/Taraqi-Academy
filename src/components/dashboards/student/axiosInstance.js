import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050', // replace this with your specific URL
  withCredentials: true,
});

export default axiosInstance;