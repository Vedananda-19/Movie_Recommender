import axios from "axios";


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

api.interceptors.response.use((response) => (response),
    (error) => {
        if (error.response?.status==401){
            localStorage.removeItem("access_token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export default api