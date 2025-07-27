import type { Blog, Like, Comments, Comment } from './types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getBlogs,
  getBlog,
  getComments,
  postLike,
  postComment,
  editedComment,
  deleteComment,
  getMyBlogs,
  postBlog,
  editBlog,
  deleteBlog
} from './api'
import { useCommentStore } from '@/shared/stores/comments.store'
import toast from 'react-hot-toast'
import { useModal } from '@/shared/stores/modal.store'

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    staleTime: Infinity,
    select: res => res.blogs as Blog[]
  })
}

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id),
    staleTime: Infinity
  })
}

export const useMyBlogs = () => {
  return useQuery({
    queryKey: ['myBlogs'],
    queryFn: getMyBlogs,
    staleTime: Infinity,
    select: res => res.blogs as Blog[]
  })
}

export const useComments = ({
  blogId,
  limit,
  page
}: Omit<Comments, 'from'>) => {
  return useQuery({
    queryKey: ['comments', blogId],
    queryFn: () => getComments({ blogId, limit, page }),
    staleTime: Infinity,
    retry: 2
  })
}

export const useLike = ({ blogId, userId }: Like) => {
  return useMutation({
    mutationFn: () => postLike({ blogId, userId }),
    onError: () => toast.error('Вы не авторизованы, нельзя ставить лайк!')
  })
}

export const useBlogPost = () => {
  const queryClient = useQueryClient()
  const closeModal = useModal(state => state.closeModal)
  return useMutation({
    mutationFn: (formData: FormData) => postBlog(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['myBlogs'] })
      closeModal()
    }
  })
}

export const useBlogEdit = () => {
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

export const useComment = (blogId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      blogId,
      from,
      text,
      to
    }: Pick<Comment, 'blogId' | 'from' | 'text' | 'to'>) =>
      postComment({ blogId, from, text, to }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
  })
}

export const useCommentEdit = (blogId: string) => {
  const cancelEditMode = useCommentStore(state => state.cancelEditMode)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      _id,
      blogId,
      text
    }: Omit<Comment, '__v' | 'updatedAt' | 'createdAt' | 'to' | 'from'>) =>
      editedComment({ _id, blogId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
      cancelEditMode()
    }
  })
}

export const useCommentDelete = (blogId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] })
    }
  })
}
