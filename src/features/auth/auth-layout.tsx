import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { useMe } from '@/shared/hooks/use-me'
import { useUser } from '@/shared/stores/auth.store'

import { Loader } from '@/shared/ui/loader'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data, isSuccess, isError, isFetching } = useMe()

  const setUser = useUser(state => state.setUser)
  const removeUser = useUser(state => state.removeUser)
  const setIsAuth = useUser(state => state.setIsAuth)

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data)
      setIsAuth(true)
    } else if (isError) {
      removeUser()
      setIsAuth(false)
    }
  }, [setUser, setIsAuth, removeUser, isSuccess, isError, data])

  if (isFetching) return <Loader text='Готовим интерфейс' variant='blocks' />

  return (
    <main className='w-full min-h-dvh px-4 sm:px-0 bg-white flex items-center sm:items-start py-5 sm:py-20 justify-center'>
      {children}
    </main>
  )
}
