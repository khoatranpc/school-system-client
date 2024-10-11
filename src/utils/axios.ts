import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}`
});
axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
}, function (error) {
    return Promise.reject(error);
})
export default axiosInstance;