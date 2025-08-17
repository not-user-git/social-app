import type { LucideIcon } from 'lucide-react'
import { AlignJustify, CircleUserRound, Home } from 'lucide-react'
import { ROUTES } from '@/shared/model/routes'

interface navItem {
  path: string
  icon: LucideIcon
  text: string
}

export const links: navItem[] = [
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
