import type { Like } from '../types'
import { useMutation } from '@tanstack/react-query'
import { like } from '../api'
import toast from 'react-hot-toast'

export const useLike = () => {
  return useMutation({
    mutationFn: ({ blogId, userId }: Like) => like({ blogId, userId }),
    onError: () => toast.error('Вы не авторизованы, нельзя ставить лайк!')
  })
}
