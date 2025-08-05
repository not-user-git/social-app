import { useEffect, useState, lazy, Suspense } from 'react'

import { useMe } from '../shared/hooks/use-me'
import { useUser } from '../shared/stores/auth.store'

import { MainLoader } from '@/shared/ui/main-loader'
import { SecondaryLoader } from '@/shared/ui/secondary-loader'

const App = lazy(() => import('./compose/app'))

export const AppInitializer = () => {
  const { data, isSuccess, isError } = useMe()
  const setUser = useUser(state => state.setUser)
  const setIsAuth = useUser(state => state.setIsAuth)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data)
      setIsAuth(true)
      setTimeout(() => setIsReady(true), 1000)
    } else if (isError) {
      setTimeout(() => setIsReady(true), 1000)
    }
  }, [isSuccess, isError])

  if (!isReady) {
    return (
      <div className='w-full h-dvh flex flex-col gap-2 items-center justify-center'>
        <MainLoader />
        <span className='text-neutral-black'>
          Получаем данные пользователя
          <span className='animate-pulse'>.</span>
          <span className='animate-pulse animate-delay-100'>.</span>
          <span className='animate-pulse animate-delay-200'>.</span>
        </span>
      </div>
    )
  }
  return (
    <Suspense
      fallback={
        <div className='w-full h-dvh flex flex-col gap-2 items-center justify-center'>
          <SecondaryLoader />
          <span className='text-neutral-black'>
            Готовим интерфейс
            <span className='animate-pulse'>.</span>
            <span className='animate-pulse animate-delay-100'>.</span>
            <span className='animate-pulse animate-delay-200'>.</span>
          </span>
        </div>
      }
    >
      <App />
    </Suspense>
  )
}
