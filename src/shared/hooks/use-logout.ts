import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ROUTES } from '../model/routes'
import { useToken, useUser } from '../stores/auth.store'

export const useLogOut = () => {
  const removeToken = useToken(state => state.removeToken)
  const removeUser = useUser(state => state.removeUser)
  const setIsAuth = useUser(state => state.setIsAuth)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logout = () => {
    removeToken()
    removeUser()
    setIsAuth(false)
    queryClient.clear()
    navigate(ROUTES.LOGIN)
    toast.success('Вы вышли из системы!')
  }

  return logout
}
