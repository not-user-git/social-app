import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthMiddleware } from '@/shared/middlewares/auth-middleware'
import { GlobalModal } from '@/shared/ui/global-modal'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthMiddleware>{children}</AuthMiddleware>
        <Toaster
          toastOptions={{
            duration: 2000
          }}
        />
        <GlobalModal />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  )
}
