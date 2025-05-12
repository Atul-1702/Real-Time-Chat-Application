
import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosConfig;