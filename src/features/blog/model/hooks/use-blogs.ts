import type { Blog } from '../types'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../api'

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    staleTime: Infinity,
    select: res => res.blogs as Blog[]
  })
}
