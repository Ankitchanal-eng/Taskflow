import axios from 'axios';

const LIVE_API_URL = '[https://taskflow-m3nm.onrender.com/]';

// Create a custom instance of Axios with the backend base URL
const api = axios.create({
    baseURL: 'baseURL: LIVE_API_URL, // <-- THIS IS THE CRITICAL CHANGE',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor: This runs BEFORE every request is sent.
api.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        // If the token exists, attach it as a Bearer token in the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;