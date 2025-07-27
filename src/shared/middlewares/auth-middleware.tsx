import { useEffect } from 'react'
import { useMe } from '@/shared/hooks/use-me'
import { useUser } from '../stores/auth.store'

export const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { data, isSuccess, isError } = useMe()
  const setUser = useUser(state => state.setUser)
  const setIsAuth = useUser(state => state.setIsAuth)

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data)
      setIsAuth(true)
    }
  }, [isSuccess, isError, data, setUser])

  return <>{children}</>
}
