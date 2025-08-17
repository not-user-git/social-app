import { useEffect, useState, lazy, Suspense } from 'react'

import { useMe } from '@/shared/hooks/use-me'
import { useUser, useToken } from '@/shared/stores/auth.store'

import { Loader } from '@/shared/ui/loader'

const App = lazy(() => import('./compose/app'))

export const AppInitializer = () => {
  const { data, isSuccess, isError } = useMe()

  const setUser = useUser(state => state.setUser)
  const setIsAuth = useUser(state => state.setIsAuth)
  const removeToken = useToken(state => state.removeToken)

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data)
      setIsAuth(true)
      setIsReady(true)
    } else if (isError) {
      removeToken()
      setIsReady(true)
    }
  }, [setUser, setIsAuth, setIsReady, isSuccess, isError, removeToken, data])

  if (!isReady) {
    return <Loader text='Получаем данные пользователя' variant='dots' />
  }

  return (
    <Suspense fallback={<Loader text='Готовим интерфейс' variant='blocks' />}>
      <App />
    </Suspense>
  )
}
