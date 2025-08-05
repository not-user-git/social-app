import type {
  ControllerRenderProps,
  FieldError,
  FieldErrorsImpl,
  Merge
} from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props {
  label: string
  field: ControllerRenderProps<any, any>
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  placeholder: string
  maxLength?: number
  type: 'login' | 'password' | 'email' | 'name' | 'lname' | 'tel' | 'avatar'
}

export const Input = ({
  label,
  field,
  error,
  placeholder,
  maxLength,
  type
}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-semibold text-neutral-800' htmlFor={type}>
        {label}
      </label>

      <input
        {...field}
        id={type}
        autoComplete='off'
        spellCheck={false}
        maxLength={maxLength}
        type={type}
        className={twMerge(
          'w-full text-sm h-9 text-neutral-800 placeholder:text-neutral-800/75 px-3 py-1 border border-neutral-500/40 outline-neutral-500/20 focus:outline-4 rounded-lg',
          error && 'border-red-500/40'
        )}
        placeholder={placeholder}
      />
    </div>
  )
}
