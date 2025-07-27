import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Pen } from 'lucide-react'
import { BlogCommentMenu } from '../ui/blog-comment-menu'
import { useCommentDelete } from '../model/model'
import { Avatar } from '@/shared/ui/avatar'
import { toDefaultDate } from '@/shared/lib/helpers/to-default-date'
import { useCommentStore } from '@/shared/stores/comments.store'

interface Props {
  my: boolean
  id: string | null
  blogId: string | null
  text: string | null
  updated: string | null
  created: string
}

export const BlogComment = ({
  my,
  updated,
  text,
  created,
  id,
  blogId
}: Props) => {
  const { mutate: deleteComment } = useCommentDelete(blogId ?? '')
  const setId = useCommentStore(state => state.setId)
  const editMode = useCommentStore(state => state.editMode)
  const cancelEditMode = useCommentStore(state => state.cancelEditMode)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <section
      className={twMerge(
        'w-full flex items-start gap-3',
        my ? 'justify-end pl-6 text-right' : 'justify-start pr-6 text-left'
      )}
    >
      {my ? (
        <div className='relative order-2 leading-none'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='outline-none cursor-pointer leading-none'
          >
            <Avatar me={my} />
          </button>
          {isOpen && (
            <BlogCommentMenu
              id={id ?? ''}
              cancelEditMode={cancelEditMode}
              setId={setId}
              onDelete={deleteComment}
              onEditMode={editMode}
              text={text}
              setState={setIsOpen}
            />
          )}
        </div>
      ) : (
        <span className='order-1'>
          <Avatar me={my} />
        </span>
      )}
      <div className={twMerge('w-full', my ? 'order-1' : 'order-2')}>
        <p className='text-neutral-800 text-sm break-words break-all leading-none pt-2'>
          {text}
        </p>
        <span
          className={twMerge(
            'mt-2 flex items-center gap-1 text-neutral-500 leading-none',
            my ? 'justify-end' : 'justify-start'
          )}
        >
          <span className={twMerge('text-[12px]', my ? 'order-2' : 'order-1')}>
            {updated !== created
              ? toDefaultDate(updated ?? '')
              : toDefaultDate(created)}
          </span>

          {updated !== created && (
            <Pen className={twMerge('size-2.5', my ? 'order-1' : 'order-2')} />
          )}
        </span>
      </div>
    </section>
  )
}
