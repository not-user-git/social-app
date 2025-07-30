import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteBlog } from '../api'

export const useBlogDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['myBlogs'] })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['myBlogs'] })
    }
  })
}
