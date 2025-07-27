import { useLocation } from 'react-router'
import { CircleUserRound, AlignJustify, Home } from 'lucide-react'
import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/button'
import { twMerge } from 'tailwind-merge'

export const Aside = ({ isMobile }: { isMobile: boolean }) => {
  const location = useLocation()
  return (
    <aside className={twMerge('flex-none', isMobile ? 'basis-0' : 'basis-1/5')}>
      <ul
        className={twMerge(
          'leading-none',
          isMobile
            ? 'flex justify-between px-5 py-2 border-t-2 border-neutral-200'
            : ''
        )}
      >
        <li>
          <Button
            mode='link'
            path={ROUTES.HOME}
            full={!isMobile}
            mobileMode={isMobile}
            icon={Home}
            variant='second'
            active={ROUTES.HOME === location.pathname}
          >
            {isMobile ? '' : 'Главная'}
          </Button>
        </li>
        <li>
          <Button
            mode='link'
            path={ROUTES.MY}
            full={!isMobile}
            mobileMode={isMobile}
            icon={AlignJustify}
            variant='second'
            active={ROUTES.MY === location.pathname}
          >
            {isMobile ? '' : 'Мои блоги'}
          </Button>
        </li>
        <li>
          <Button
            mode='link'
            path={ROUTES.ACCOUNT}
            full={!isMobile}
            mobileMode={isMobile}
            icon={CircleUserRound}
            variant='second'
            active={ROUTES.ACCOUNT === location.pathname}
          >
            {isMobile ? '' : 'Аккаунт'}
          </Button>
        </li>
      </ul>
    </aside>
  )
}
