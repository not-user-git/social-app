import type { Comment } from '../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from '../api'

export const useCreateComment = (blogId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      blogId,
      from,
      text,
      to
    }: Pick<Comment, 'blogId' | 'from' | 'text' | 'to'>) =>
      createComment({ blogId, from, text, to }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
  })
}
