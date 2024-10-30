import axios from "axios"

const baseUrl = 'http://localhost:3000'

const axiosInstance = axios.create({
    baseURL: baseUrl,
})

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    req.headers.Authorization = token
    return req
})



export default axiosInstance ;