import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment } from '../api'

export const useDeleteComment = (blogId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
    }
  })
}
