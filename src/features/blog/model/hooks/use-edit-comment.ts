import type { Comment } from '../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCommentStore } from '@/features/blog/model/comment.store'
import { editComment } from '../api'

export const useEditComment = (blogId: string) => {
  const cancelEditMode = useCommentStore(state => state.cancelEditMode)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      _id,
      blogId,
      text
    }: Omit<Comment, '__v' | 'updatedAt' | 'createdAt' | 'to' | 'from'>) =>
      editComment({ _id, blogId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
      cancelEditMode()
    }
  })
}
