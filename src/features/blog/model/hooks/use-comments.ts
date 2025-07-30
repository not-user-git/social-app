import type { Comments } from '../types'
import { useQuery } from '@tanstack/react-query'
import { getComments } from '../api'

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
