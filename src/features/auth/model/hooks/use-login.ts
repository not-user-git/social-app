import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { useToken } from '@/shared/stores/auth.store'
import { useUser } from '@/shared/stores/auth.store'
import { ROUTES } from '@/shared/model/routes'

import { login } from '../api'

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
