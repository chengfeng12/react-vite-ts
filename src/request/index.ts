// src/request/index.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 从 .env 读取
  timeout: 10000
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截
instance.interceptors.response.use(
  (response) => response.data, // 直接返回 data
  (error) => {
    if (error.response?.status === 401) {
      // 跳转到登录页
    }
    return Promise.reject(error)
  }
)

export default instance
