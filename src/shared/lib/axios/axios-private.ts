import axios from 'axios'
import { CONFIG } from '@/shared/model/config'

export const axiosPrivate = axios.create({
  baseURL: CONFIG.API,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosPrivate.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.token).state.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
