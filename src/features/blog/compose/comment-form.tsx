import type { Comment } from '../model/types'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { SendHorizonal, X } from 'lucide-react'
import { BlogInput } from '../ui/blog-input'
import { useComment, useCommentEdit } from '../model/model'
import { useCommentStore } from '@/shared/stores/comments.store'
import { twMerge } from 'tailwind-merge'

export const CommentForm = ({
  blogId,
  from,
  to
}: Pick<Comment, 'blogId' | 'from' | 'to'>) => {
  const prevCommentValue = useCommentStore(state => state.value)
  const _id = useCommentStore(state => state._id)
  const isEditMode = useCommentStore(state => state.isEditMode)
  const cancelEditMode = useCommentStore(state => state.cancelEditMode)

  const { mutate: comment } = useComment(blogId ?? '')
  const { mutate: commentEdit } = useCommentEdit(blogId ?? '')

  const { handleSubmit, control, reset, setFocus } = useForm({
    mode: 'onChange',
    defaultValues: {
      text: isEditMode ? prevCommentValue : ''
    }
  })

  const onSubmit = ({ text }: { text: string | null }) => {
    if (isEditMode) commentEdit({ _id, blogId, text })
    else comment({ blogId, from, to, text })
    reset()
  }

  useEffect(() => {
    if (isEditMode && prevCommentValue) {
      reset({ text: prevCommentValue })
      setTimeout(() => setFocus('text'), 0)
    } else {
      reset({ text: '' })
    }
  }, [isEditMode, prevCommentValue, reset, setFocus])

  return (
    <form
      className='w-full flex items-center gap-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='text'
        control={control}
        rules={{
          required: true
        }}
        render={({ field }) => (
          <BlogInput
            isEditMode={isEditMode}
            placeholder={
              isEditMode ? 'Измененный комментарий' : 'Ваш комментарий...'
            }
            field={field}
          />
        )}
      />
      <div
        className={twMerge(
          'h-full flex',
          isEditMode ? 'flex-col justify-center gap-2' : 'items-center'
        )}
      >
        {isEditMode ? (
          <>
            <button
              type='submit'
              className='bg-primary size-8 flex justify-center items-center rounded-md cursor-pointer'
            >
              <SendHorizonal className='size-4 text-neutral-100' />
            </button>
            <button
              type='button'
              onClick={cancelEditMode}
              className='bg-red-500 size-8 flex justify-center items-center rounded-md cursor-pointer'
            >
              <X className='size-4 text-neutral-100' />
            </button>
          </>
        ) : (
          <button
            type='submit'
            className='bg-primary size-8 flex justify-center items-center rounded-md cursor-pointer'
          >
            <SendHorizonal className='size-4 text-neutral-100' />
          </button>
        )}
      </div>
    </form>
  )
}
