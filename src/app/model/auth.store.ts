import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/shared/model/types'

interface Token {
  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
}

interface UserStore {
  user: User
  isAuth: boolean
  isInitialized: boolean
  setUser: (data: User) => void
  removeUser: () => void
  setIsAuth: (data: boolean) => void
  setIsInitialized: (data: boolean) => void
}

export const useUser = create<UserStore>(set => ({
  user: {
    _id: null,
    avatar: null,
    email: null,
    lname: null,
    login: null,
    name: null,
    password: null,
    phone: null
  },
  isAuth: false,
  isInitialized: false,
  setUser: data => set({ user: data }),
  removeUser: () =>
    set({
      user: {
        _id: null,
        avatar: null,
        email: null,
        lname: null,
        login: null,
        name: null,
        password: null,
        phone: null
      }
    }),
  setIsAuth: data => set({ isAuth: data }),
  setIsInitialized: data => set({ isInitialized: data })
}))

export const useToken = create<Token>()(
  persist(
    set => ({
      token: null,
      setToken: value => set({ token: value }),
      removeToken: () => set({ token: null })
    }),
    {
      name: 'token'
    }
  )
)
