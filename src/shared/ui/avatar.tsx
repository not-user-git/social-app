import { User } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface Props {
  image?: string | null
  me?: boolean
  username?: string
}

export const Avatar = ({ image, username, me = false }: Props) => {
  return (
    <>
      {image ? (
        <span className='size-8 rounded-full overflow-hidden leading-none'>
          <img src={image} alt={username} />
        </span>
      ) : (
        <span
          className={twMerge(
            'size-8 flex items-center justify-center rounded-full leading-none',
            me ? 'bg-primary' : 'bg-gray-700'
          )}
        >
          <User className='size-1/2 text-neutral-100' />
        </span>
      )}
    </>
  )
}
