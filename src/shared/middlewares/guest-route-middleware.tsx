import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../model/routes'
import { useUser } from '../stores/auth.store'

export const GuestRouteMiddleware = ({ children }: { children: ReactNode }) => {
  const isAuth = useUser(state => state.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.HOME, { replace: true })
    }
  }, [isAuth, navigate])

  if (isAuth) return null

  return <>{children}</>
}
