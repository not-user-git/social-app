import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Heart, MessageSquare, Copy, Bookmark } from 'lucide-react'

type T = 'like' | 'comment' | 'share' | 'save'

interface Props {
  type: T
  counter: boolean
  commentCount?: number
  likeCount?: number
  data?: string
  handleClick: () => void
}

const ICONS = {
  like: <Heart />,
  comment: <MessageSquare />,
  share: <Copy />,
  save: <Bookmark />
}

const STYLES = {
  like: 'hover:bg-like/10 focus-within:bg-like/10 focus-visible::*:text-like hover:*:text-like',
  comment: 'hover:bg-primary/10 focus-within:bg-primary/10 focus-visible::*:text-primary hover:*:text-primary',
  share: 'hover:bg-share/10 focus-within:bg-share/10 focus-visible::*:text-share hover:*:text-share',
  save: 'hover:bg-save/10 focus-within:bg-save/10 focus-visible::*:text-save hover:*:text-save'
}

export const BlogOption = ({
  type,
  commentCount,
  likeCount = 0,
  counter,
  handleClick,
  data
}: Props) => {
  const [lCount, setLikeCount] = useState<number>(likeCount)

  useEffect(() => {
    if (data === 'yes') setLikeCount(prev => prev + 1)
    if (data === 'no') setLikeCount(prev => prev - 1)
  }, [data])

  return (
    <div className='flex gap-0.5 items-center text-neutral-600 select-none'>
      <button
        onClick={e => {
          e.stopPropagation()
          e.currentTarget.blur()
          handleClick()
        }}
        className={twMerge(
          'size-9 p-2 outline-none rounded-full cursor-pointer',
          STYLES[type]
        )}
      >
        <span
          className={twMerge(
            '*:size-full',
            `${type === 'like' && lCount && '*:fill-like *:text-like'}`
          )}
        >
          {ICONS[type]}
        </span>
      </button>
      {counter && (
        <span className='h-5 leading-none'>
          {type === 'like' && lCount}
          {type === 'comment' && commentCount}
        </span>
      )}
    </div>
  )
}
