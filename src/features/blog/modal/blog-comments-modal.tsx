import type { Dispatch, SetStateAction } from 'react'
import type { Comments } from '../model/types'
import { useEffect } from 'react'
import { useComments } from '../model'
import { CommentForm } from '../compose/comment-form'
import { BlogComment } from '../compose/blog-comment'
import { useUser } from '@/app/model/auth.store'
import { twMerge } from 'tailwind-merge'

export const BlogCommentsModal = ({
  blogId,
  from,
  limit,
  page,
  setCommentCount
}: Comments & { setCommentCount: Dispatch<SetStateAction<number>> }) => {
  const { data } = useComments({ blogId, limit, page })
  const userId = useUser(state => state.user._id)

  useEffect(() => {
    setCommentCount(data ? data.length : 0)
  }, [data])

  return (
    <section className='w-[320px] sm:w-[450px]'>
      <div
        className={twMerge(
          'w-full h-[450px] sm:pr-2 overflow-y-scroll my-3 flex flex-col gap-3 scrollbar-hidden',
          !!!data?.length && 'items-center justify-center'
        )}
      >
        {data?.length ? (
          data ? (
            data.map(comment => (
              <BlogComment
                key={comment._id}
                blogId={blogId}
                id={comment._id}
                my={userId === comment.from}
                updated={comment.updatedAt}
                created={comment.createdAt ? comment.createdAt : ''}
                text={comment.text}
              />
            ))
          ) : (
            <span>Загрузка...</span>
          )
        ) : (
          <span className='text-neutral-800 text-lg'>
            Оставьте первый комментарий
          </span>
        )}
      </div>
      <CommentForm blogId={blogId} from={from} to={blogId} />
    </section>
  )
}
