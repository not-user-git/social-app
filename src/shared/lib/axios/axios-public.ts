import axios from 'axios'
import { CONFIG } from '@/shared/model/config'

export const axiosPublic = axios.create({
  baseURL: CONFIG.API,
  headers: {
    'Content-Type': 'application/json'
  }
})
