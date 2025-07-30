import { useQuery } from '@tanstack/react-query'
import { getBlog } from '../api'

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id),
    staleTime: Infinity
  })
}
