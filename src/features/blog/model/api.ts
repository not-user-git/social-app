import { axiosPublic } from '@/shared/lib/axios/axios-public'
import { axiosPrivate } from '@/shared/lib/axios/axios-private'
import { ENDPOINTS } from '@/shared/api/endpoints'
import type { Blogs, Blog, Like, Comments, Comment } from './types'

export const getBlogs = async (): Promise<Blogs> => {
  const res = await axiosPublic.get<Blogs>(ENDPOINTS.BLOG.ALL)
  return res.data
}

export const getMyBlogs = async () => {
  const res = await axiosPrivate.get<Blogs>(ENDPOINTS.BLOG.MY)
  return res.data
}

export const getBlog = async (id: string) => {
  const res = await axiosPrivate.get<Blog>(ENDPOINTS.BLOG.FINDONE(id))
  return res.data
}

export const getComments = async ({
  blogId,
  limit,
  page
}: Omit<Comments, 'from'>) => {
  const res = await axiosPrivate.get<Comment[]>(ENDPOINTS.COMMENT.ALL, {
    params: { blogId, limit, page }
  })
  return res.data
}

export const postLike = async ({ blogId, userId }: Like) => {
  const res = await axiosPrivate.post(ENDPOINTS.LIKE, { blogId, userId })
  return res.data
}

export const postComment = async ({
  blogId,
  from,
  text,
  to
}: Pick<Comment, 'blogId' | 'from' | 'text' | 'to'>) => {
  const res = await axiosPrivate.post(ENDPOINTS.COMMENT.CREATE, {
    blogId,
    from,
    text,
    to
  })
  return res.data
}

export const postBlog = async (formData: FormData) => {
  const res = await axiosPrivate.post(ENDPOINTS.BLOG.CREATE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

export const editBlog = async (formData: FormData) => {
  const res = await axiosPrivate.put(ENDPOINTS.BLOG.EDIT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

export const deleteBlog = async (id: string) => {
  const res = await axiosPrivate.delete(ENDPOINTS.BLOG.DELETE(id))
  return res.data
}

export const editedComment = async ({
  _id,
  blogId,
  text
}: Omit<Comment, '__v' | 'updatedAt' | 'createdAt' | 'to' | 'from'>) => {
  const res = await axiosPrivate.put(ENDPOINTS.COMMENT.EDIT, {
    _id,
    blogId,
    text
  })
  return res.data
}

export const deleteComment = async (id: string | null) => {
  const res = await axiosPrivate.delete(ENDPOINTS.COMMENT.DELETE(id))
  return res.data
}
