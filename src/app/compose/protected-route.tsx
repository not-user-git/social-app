import type { ReactNode } from 'react'
import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router'

import { useUser } from '@/shared/stores/auth.store'
import { ROUTES } from '@/shared/model/routes'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useUser(state => state.isAuth)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.HOME, { replace: true })
    }
  }, [isAuth, navigate])

  if (isAuth) return <>{children}</>
  return <></>
}
