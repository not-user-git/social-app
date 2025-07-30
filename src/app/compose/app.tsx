import { Outlet } from 'react-router'
import { Header } from '@/features/header'
import { Aside } from '@/features/aside'
import { useDeviceInfo } from '@/shared/hooks/use-device-info'

const App = () => {
  const { isMobile } = useDeviceInfo()
  return (
    <main className='w-full h-dvh flex flex-col md:gap-3 overflow-hidden min-h-0'>
      <Header />
      <div className='custom-container w-full min-h-0 flex flex-1 overflow-hidden'>
        {!isMobile && <Aside isMobile={isMobile} />}
        <Outlet />
      </div>
      {isMobile && <Aside isMobile={isMobile} />}
    </main>
  )
}

export default App
