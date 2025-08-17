import type { BlogUpload } from '../model/types'

import { useRef, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ImageOff } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useCreateBlog, useEditBlog, useFormData } from '../model'

interface Props {
  _id?: string
  editMode: boolean
  title?: string
  text?: string
  prevImage?: string
}

export const BlogCreateForm = ({
  _id = '',
  editMode,
  title,
  text,
  prevImage = ''
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const createFormData = useFormData()

  const { mutate: postBlog } = useCreateBlog()
  const { mutate: editBlog } = useEditBlog()

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<BlogUpload>({ mode: 'onChange' })

  const file = watch('image')
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    if (editMode) {
      setPreview(prevImage ?? '')
      reset({
        title,
        text
      })
    }
  }, [editMode, prevImage, reset, title, text])

  useEffect(() => {
    if (!file) return
    setPreview(URL.createObjectURL(file))

    return () => {
      URL.revokeObjectURL(URL.createObjectURL(file))
    }
  }, [file])

  const onSubmit = (data: BlogUpload) => {
    const formData = createFormData({ data, prevImage, _id, editMode })

    if (editMode) editBlog(formData)
    else postBlog(formData)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-5'
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='title' className='text-base text-neutral-700'>
          Название блога
        </label>
        <input
          {...register('title', {
            required: 'Название обязательно',
            maxLength: {
              value: 28,
              message: 'Название максимум может иметь 24 символа'
            },
            minLength: {
              value: 1,
              message: 'Название минимум может иметь 1 символ'
            }
          })}
          id='title'
          name='title'
          autoComplete='off'
          spellCheck={false}
          maxLength={28}
          type='text'
          placeholder='Жизнь в Бали...'
          className={twMerge(
            'w-full text-base text-neutral-800 placeholder:text-neutral-800/50 border px-2.5 py-2 focus:outline-4 rounded',
            errors.title
              ? 'border-red-600/40 outline-red-600/10 '
              : 'border-neutral-800/40 outline-neutral-800/10'
          )}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='text' className='text-base text-neutral-700'>
          Текст
        </label>
        <textarea
          {...register('text', {
            required: 'Текст обязателен',
            maxLength: {
              value: 500,
              message: 'Текст максимум может иметь 500 символов'
            },
            minLength: {
              value: 3,
              message: 'Текст минимум может иметь 3 символов'
            }
          })}
          maxLength={500}
          id='text'
          name='text'
          autoComplete='off'
          spellCheck={false}
          placeholder='Сегодня мой блог о том что...'
          className={twMerge(
            'w-full h-[110px] sm:h-[70px] text-base text-neutral-800 placeholder:text-neutral-800/50 border px-2.5 py-2 focus:outline-4 rounded resize-none',
            errors.text
              ? 'border-red-600/40 outline-red-600/10 '
              : 'border-neutral-800/40 outline-neutral-800/10'
          )}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-base text-neutral-700' htmlFor='image'>
          Фотографии
        </label>
        <Controller
          name='image'
          control={control}
          rules={editMode ? {} : { required: 'Без фотографии нельзя' }}
          render={({ field }) => (
            <>
              <input
                ref={e => {
                  inputRef.current = e
                  field.ref(e)
                }}
                id='image'
                name='image'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={e => field.onChange(e.target.files?.[0])}
              />
              <button
                type='button'
                onClick={() => inputRef.current?.click()}
                className={twMerge(
                  'w-1/2 sm:w-1/3 text-sm text-white text-center p-2 rounded outline-none cursor-pointer',
                  errors.image ? 'bg-red-600/80' : 'bg-neutral-900/80'
                )}
              >
                {editMode ? 'Поменять фото' : 'Загрузить фото'}
              </button>
            </>
          )}
        />
      </div>
      <div className='flex gap-3 overflow-x-auto scrollbar-hidden'>
        {preview ? (
          <img
            draggable={false}
            src={preview}
            className='w-[90px] h-[110px] object-cover rounded border border-neutral-800'
            alt={`preview-${preview}`}
          />
        ) : (
          <span className='w-[90px] h-[120px] flex items-center justify-center rounded border-2 border-neutral-300 border-dashed'>
            <ImageOff className='text-neutral-300' />
          </span>
        )}
      </div>
      <button
        type='submit'
        className='w-full text-white text-lg font-semibold bg-primary rounded py-2 cursor-pointer'
      >
        {editMode ? 'Обновить' : 'Загрузить'}
      </button>
    </form>
  )
}
