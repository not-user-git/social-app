import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useUser } from '@/shared/stores/auth.store'
import { ROUTES } from '@/shared/model/routes'

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useUser(state => state.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.HOME, { replace: true })
    }
  }, [isAuth, navigate])

  return <>{children}</>
}
