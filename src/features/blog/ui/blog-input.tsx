import type { ControllerRenderProps } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props {
  field: ControllerRenderProps<any, any>
  placeholder: string
  isEditMode: boolean
}

export const BlogInput = ({ field, placeholder, isEditMode }: Props) => {
  return (
    <textarea
      autoComplete='off'
      placeholder={placeholder}
      className={twMerge(
        'bg-white min-h-[80px] flex-1 text-neutral-800 placeholder:text-neutral-600 placeholder:italic focus-within:placeholder:text-transparent border-2 outline-none resize-none border-neutral-300 rounded-md px-3 py-1.5 scrollbar-hidden',
        isEditMode ? 'focus-within:border-beta' : 'focus-within:border-primary'
      )}
      {...field}
    />
  )
}
