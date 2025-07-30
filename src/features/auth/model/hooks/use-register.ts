import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { ROUTES } from '@/shared/model/routes'

import { register } from '../api'

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
