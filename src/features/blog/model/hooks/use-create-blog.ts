import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from '@/shared/stores/modal.store'
import { createBlog } from '../api'

export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  const closeModal = useModal(state => state.closeModal)
  return useMutation({
    mutationFn: (formData: FormData) => createBlog(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['myBlogs'] })
      closeModal()
    }
  })
}
