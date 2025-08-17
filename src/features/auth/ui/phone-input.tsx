import type { ControllerRenderProps } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

interface Props {
  label: string
  field: ControllerRenderProps<any, any>
  error?: string
}

export const PhoneInput = ({ label, field }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-semibold text-neutral-800' htmlFor='tel'>
        {label}
      </label>
      <IMaskInput
        id='tel'
        type='tel'
        autoComplete='off'
        mask='+998 (00) 000-00-00'
        {...field}
        placeholder='+998 (__) ___-__-__'
        className='w-full text-sm h-9 text-neutral-800 placeholder:text-neutral-800/75 px-3 py-1 border border-neutral-500/40 outline-neutral-500/20 focus:outline-4 rounded-lg'
      />
    </div>
  )
}
