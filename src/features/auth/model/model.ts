import type { User } from '@/shared/model/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { useToken, useUser } from '@/shared/stores/auth.store'
import { ROUTES } from '@/shared/model/routes'
import { register, login, edit } from './api'

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate(ROUTES.LOGIN, { replace: true })
      toast.success('Регистрация прошла успешно!')
    },
    onError: data => {
      console.log(data.message)
      toast.error('Не удалось регистрироваться')
    }
  })
}

export const useLogin = () => {
  const setToken = useToken(state => state.setToken)
  const setUser = useUser(state => state.setUser)
  const setIsAuth = useUser(state => state.setIsAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      if (data.statusText === 'OK') {
        setToken(data.data.token)
        setUser(data.data.user)
        setIsAuth(true)
        navigate(ROUTES.HOME, { replace: true })
        toast.success('Вы успешно вошли в систему!')
      }
    },
    onError: () => toast.error('Не удалось войти в систему')
  })
}

export const useEdit = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const _id = useUser(state => state.user._id) ?? ''

  return useMutation({
    mutationFn: (data: User) => edit({ _id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      navigate(ROUTES.HOME)
      toast.success('Ваш аккаунт успешно обновлен!')
    },
    onError: () => {
      toast.error('Не удалось обновить ваш аккаунт')
    }
  })
}
