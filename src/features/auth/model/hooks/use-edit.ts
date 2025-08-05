import type { User } from '@/shared/model/types'

import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { useUser } from '@/shared/stores/auth.store'
import { ROUTES } from '@/shared/model/routes'

import { edit } from '../api'

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
