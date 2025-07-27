import { axiosPublic } from '@/shared/lib/axios/axios-public'
import { axiosPrivate } from '@/shared/lib/axios/axios-private'
import { ENDPOINTS } from '@/shared/api/endpoints'
import type { UserLogin } from './types'
import type { User } from '@/shared/model/types'

export const register = async (data: User) => {
  return await axiosPublic.post<User>(ENDPOINTS.AUTH.REGISTER, data)
}

export const login = async (data: UserLogin) => {
  return await axiosPublic.post(ENDPOINTS.AUTH.LOGIN, data)
}

export const edit = async ({ _id, data }: { _id: string; data: User }) => {
  return await axiosPrivate.put(ENDPOINTS.AUTH.UPDATE(_id), data)
}
