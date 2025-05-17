
import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosConfig = axios.create({
    baseURL: "http://localhost:4000",
})

axiosConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('user')}`
    return config;
})

export default axiosConfig;