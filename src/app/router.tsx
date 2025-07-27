import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/shared/model/routes'
import { ProtectedRouteMiddleware } from '@/shared/middlewares/protected-route-middleware'
import { GuestRouteMiddleware } from '@/shared/middlewares/guest-route-middleware'
import { App } from './app'

const BlogsPage = lazy(() => import('@/features/blog/blogs.page'))
const BlogPage = lazy(() => import('@/features/blog/blog.page'))
const MyBlogsPage = lazy(() => import('@/features/blog/my-blogs.page'))
const RegisterPage = lazy(() => import('@/features/auth/register.page'))
const LoginPage = lazy(() => import('@/features/auth/login.page'))
const AccountPage = lazy(() => import('@/features/auth/account.page'))

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <BlogsPage />
      },
      {
        path: ROUTES.BLOG,
        element: (
          <ProtectedRouteMiddleware>
            <BlogPage />
          </ProtectedRouteMiddleware>
        )
      },
      {
        path: ROUTES.MY,
        element: (
          <ProtectedRouteMiddleware>
            <MyBlogsPage />
          </ProtectedRouteMiddleware>
        )
      },
      {
        path: ROUTES.ACCOUNT,
        element: (
          <ProtectedRouteMiddleware>
            <AccountPage />
          </ProtectedRouteMiddleware>
        )
      }
    ]
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <GuestRouteMiddleware>
        <RegisterPage />
      </GuestRouteMiddleware>
    )
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <GuestRouteMiddleware>
        <LoginPage />
      </GuestRouteMiddleware>
    )
  }
])
