import { Outlet } from 'react-router'
import { Header } from '@/features/header'
import { Aside } from '@/features/aside'
import { useDeviceInfo } from '@/shared/hooks/useDeviceInfo'

export function App() {
  const { isMobile } = useDeviceInfo()
  return (
    <main className='w-full h-dvh flex flex-col sm:gap-1 overflow-hidden min-h-0'>
      <Header />
      <div className='custom-container w-full min-h-0 flex flex-1 overflow-hidden'>
        {!isMobile && <Aside isMobile={isMobile} />}
        <Outlet />
      </div>
      {isMobile && <Aside isMobile={isMobile} />}
    </main>
  )
}
