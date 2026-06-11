import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")!).access_token : null
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api