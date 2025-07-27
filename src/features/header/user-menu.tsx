import type { Dispatch, SetStateAction } from 'react'
import { useLogOut } from '@/shared/hooks/use-logout'
import { LogOut } from 'lucide-react'
import { confirmLogout } from '@/shared/lib/toast/confirm-logout'

interface UserMenuProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const UserMenu = ({ setIsOpen }: UserMenuProps) => {
  const logout = useLogOut()

  return (
    <ul className='absolute bottom-[-20%] w-full text-neutral-700 bg-white border-2 border-neutral-400 rounded-md translate-y-full z-10'>
      <li>
        <button
          onClick={() => {
            confirmLogout(logout)
            setIsOpen(false)
          }}
          className='w-full flex items-center justify-between py-2 px-3 text-left cursor-pointer'
        >
          <span className='leading-none text-sm'>Выйти</span>
          <LogOut className='size-4 leading-none' />
        </button>
      </li>
    </ul>
  )
}
