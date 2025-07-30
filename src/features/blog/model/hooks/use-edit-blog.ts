import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from '@/shared/stores/modal.store'
import { editBlog } from '../api'

export const useEditBlog = () => {
  const queryClient = useQueryClient()
  const closeModal = useModal(state => state.closeModal)
  return useMutation({
    mutationFn: (formData: FormData) => editBlog(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['myBlogs'] })
      closeModal()
    }
  })
}
