import type { AxiosResponse } from 'axios'
import type { User } from '@/shared/model/types'
import { axiosPrivate } from '@/shared/lib/axios/axios-private'
import { ENDPOINTS } from '@/shared/model/endpoints'

export const getMe = async (): Promise<AxiosResponse<User>> => {
  return await axiosPrivate.get(ENDPOINTS.AUTH.CHECKUSER)
}
