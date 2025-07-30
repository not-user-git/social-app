import type { Blog } from '../types'
import { useQuery } from '@tanstack/react-query'
import { getMyBlogs } from '../api'

export const useMyBlogs = () => {
  return useQuery({
    queryKey: ['myBlogs'],
    queryFn: getMyBlogs,
    staleTime: Infinity,
    select: res => res.blogs as Blog[]
  })
}
