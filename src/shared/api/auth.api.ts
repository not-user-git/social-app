import type { AxiosResponse } from 'axios'
import type { User } from '../model/types'
import { axiosPrivate } from '../lib/axios/axios-private'
import { ENDPOINTS } from './endpoints'

export const getMe = async (): Promise<AxiosResponse<User>> => {
  return await axiosPrivate.get(ENDPOINTS.AUTH.CHECKUSER)
}
