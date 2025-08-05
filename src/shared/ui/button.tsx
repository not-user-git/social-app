import type { LucideIcon } from 'lucide-react'
import type { MouseEventHandler } from 'react'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
  variant: 'first' | 'second'
  mode: 'button' | 'link'
  path?: string
  full?: boolean
  mobileMode?: boolean
  icon?: LucideIcon
  active?: boolean
  children: string
  onclick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
  variant,
  mode,
  path = '/',
  full = false,
  mobileMode = false,
  icon: Icon,
  active,
  children,
  onclick
}: ButtonProps) => {
  if (mode === 'link')
    return (
      <Link to={path}>
        <button
          onClick={onclick}
          className={twMerge(
            ' border-1 rounded-md cursor-pointer transition-colors duration-177 not-hover:active:*:text-white not-hover:active:*:underline hover:*:text-white hover:*:underline select-none',

            mobileMode
              ? 'p-4 rounded-full'
              : full
                ? 'w-full p-2.5'
                : 'px-4 py-1.5',

            variant === 'first'
              ? 'hover:bg-primary border-primary'
              : '*:text-neutral-500 not-hover:active:bg-primary/10 not-hover:active:*:text-primary hover:bg-primary/10 hover:*:text-primary border-transparent',

            active &&
            'bg-beta/10 text-beta *:text-beta *:underline hover:bg-beta/10 hover:*:text-beta not-hover:active:*:text-beta not-hover:active:bg-beta/10'
          )}
        >
          <span
            className={twMerge(
              'text-sm sm:text-base leading-none transition-colors duration-177 text-primary font-semibold',
              Icon && 'flex items-center gap-4 font-medium'
            )}
          >
            {Icon && <Icon className='size-5' />}
            {children}
          </span>
        </button>
      </Link>
    )

  return (
    <button
      onClick={onclick}
      className={twMerge(
        ' border-1 rounded-md cursor-pointer transition-colors duration-177 not-hover:active:*:text-white not-hover:active:*:underline hover:*:text-white hover:*:underline select-none',
        full ? 'w-full p-2.5' : 'px-4 py-5',
        variant === 'first'
          ? 'not-hover:active:bg-primary  hover:bg-primary border-primary'
          : '*:text-neutral-500 not-hover:active:bg-primary/10 not-hover:active:*:text-primary hover:bg-primary/10 hover:*:text-primary border-transparent'
      )}
    >
      <span
        className={twMerge(
          'text-sm sm:text-base leading-none transition-colors duration-177 text-primary font-semibold',
          Icon && 'flex items-center gap-4 font-medium'
        )}
      >
        {Icon && <Icon className='size-5' />}
        {children}
      </span>
    </button>
  )
}
