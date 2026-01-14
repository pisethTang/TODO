import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Your Backend URL
});

// This is an "Interceptor"
// It acts like the mirror image of your backend middleware.
// It grabs the token from storage and puts it in the Header.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;