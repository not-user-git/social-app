import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import { ROUTES } from '@/shared/model/routes'

import { AppInitializer } from './app-initializer'
import { ProtectedRoute } from './compose/protected-route'
import { GuestRoute } from './compose/guest-route'

const BlogsPage = lazy(() => import('@/features/blog/pages/blogs.page'))
const BlogPage = lazy(() => import('@/features/blog/pages/blog.page'))
const MyBlogsPage = lazy(() => import('@/features/blog/pages/my-blogs.page'))
const RegisterPage = lazy(() => import('@/features/auth/pages/register.page'))
const LoginPage = lazy(() => import('@/features/auth/pages/login.page'))
const AccountPage = lazy(() => import('@/features/auth/pages/account.page'))

export const router = createBrowserRouter([
  {
    element: <AppInitializer />,
    children: [
      {
        index: true,
        element: <BlogsPage />
      },
      {
        path: ROUTES.BLOG,
        element: (
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTES.MY,
        element: (
          <ProtectedRoute>
            <MyBlogsPage />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTES.ACCOUNT,
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    )
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    )
  }
])
