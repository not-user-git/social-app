import type { LucideIcon } from 'lucide-react'

import { useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { ROUTES } from '@/shared/model/routes'

import { AlignJustify, CircleUserRound, Home } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface navItem {
  path: string
  icon: LucideIcon
  text: string
}

export const Aside = ({ isMobileVersion }: { isMobileVersion: boolean }) => {
  const location = useLocation()

  const links: navItem[] = [
    {
      text: 'Главная',
      path: ROUTES.HOME,
      icon: Home
    },
    {
      text: 'Мои блоги',
      path: ROUTES.MY,
      icon: AlignJustify
    },
    {
      text: 'Аккаунт',
      path: ROUTES.ACCOUNT,
      icon: CircleUserRound
    }
  ]

  return (
    <aside className={isMobileVersion ? 'basis-0' : 'basis-1/5'}>
      <nav
        className={twMerge(
          'flex flex-col gap-1.5 leading-none',
          isMobileVersion &&
          'flex justify-between flex-row px-5 py-2 border-t-2 border-neutral-200'
        )}
      >
        {links.map((link, index) => (
          <Button
            key={index}
            mode='link'
            path={link.path}
            full={!isMobileVersion}
            mobileMode={isMobileVersion}
            icon={link.icon}
            variant='second'
            active={link.path === location.pathname}
          >
            {link.text}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
