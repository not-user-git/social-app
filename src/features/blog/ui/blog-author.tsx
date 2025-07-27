import { Avatar } from '@/shared/ui/avatar'
import { twMerge } from 'tailwind-merge'

interface Props {
  createDate?: string
  image: string
  authorName?: string
  me: boolean
}

export const BlogAuthor = ({ createDate, image, authorName, me }: Props) => {
  return (
    <figure
      className={twMerge(
        'flex items-center gap-2',
        me ? 'flex-row-reverse text-right' : 'flex-row'
      )}
    >
      <Avatar me={me} image={image} />
      <figcaption className='flex flex-col'>
        <h3 className='text-neutral-700 text-base leading-none font-semibold'>
          {authorName || me ? (me ? 'Вы' : authorName) : 'Неизвестный'}
        </h3>
        <span className='text-neutral-500 text-[12px] leading-normal'>
          {createDate ? createDate : 'Неизвестно'}
        </span>
      </figcaption>
    </figure>
  )
}
