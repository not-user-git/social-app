import { useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/shared/ui/button'

import { links } from './index.data'

export const Aside = ({ isMobile }: { isMobile: boolean }) => {
  const location = useLocation()

  return (
    <aside className={isMobile ? 'basis-0' : 'basis-1/5'}>
      <nav
        className={twMerge(
          'leading-none',
          isMobile && 'flex justify-between px-5 py-2 border-t-2 border-neutral-200'
        )}
      >
        {links.map((link, index) => (
          <Button
            key={index}
            mode='link'
            path={link.path}
            full={!isMobile}
            mobileMode={isMobile}
            icon={link.icon}
            variant='second'
            active={link.path === location.pathname}
          >
            {isMobile ? '' : link.text}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
