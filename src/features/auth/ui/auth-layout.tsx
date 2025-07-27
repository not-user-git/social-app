import type { ReactNode } from 'react'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='w-full min-h-dvh px-4 sm:px-0 bg-white flex items-center sm:items-start py-5 sm:py-20 justify-center'>
      {children}
    </main>
  )
}
