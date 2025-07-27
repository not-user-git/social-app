import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../model/types'

interface Token {
  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
}

interface UserStore {
  user: User
  isAuth: boolean
  setUser: (data: User) => void
  removeUser: () => void
  setIsAuth: (data: boolean) => void
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
  setIsAuth: data => set({ isAuth: data })
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
