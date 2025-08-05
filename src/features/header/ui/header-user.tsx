import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ChevronDown } from 'lucide-react'

import { Avatar } from '@/shared/ui/avatar'
import { UserMenu } from '../user-menu'

interface Props {
  name: string
  email: string | null
  avatarUrl?: string | null
}

export const User = ({ name, email, avatarUrl }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <section className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex justify-center items-center gap-2 leading-none cursor-pointer'
      >
        <Avatar me image={avatarUrl} username={name} />
        <article className='text-left leading-none'>
          <h2 className='text-base sm:text-lg text-neutral-700 font-semibold leading-none'>
            {name}
          </h2>
          <span className='text-[12px] sm:text-sm text-neutral-600 leading-none'>
            {email}
          </span>
        </article>
        <ChevronDown
          className={twMerge('leading-none size-4', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && <UserMenu setIsOpen={setIsOpen} />}
    </section>
  )
}
