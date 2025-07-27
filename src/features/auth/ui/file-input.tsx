import type { ControllerRenderProps } from 'react-hook-form'
import { useRef, useState } from 'react'

interface Props {
  label: string
  field: ControllerRenderProps<any, any>
  error?: string
}

export const FileInput = ({ label, field }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isHaveAFile, setIsHaveAFile] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList && fileList.length > 0) {
      field.onChange(fileList)
      setIsHaveAFile(true)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-semibold text-neutral-800' htmlFor='tel'>
        {label}
      </label>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleChange}
        className='hidden'
      />
      <button
        type='button'
        onClick={() => inputRef.current?.click()}
        className='w-full text-sm text-neutral-800/75 text-left p-2 border rounded-lg outline-none border-neutral-500/40 cursor-pointer'
      >
        {isHaveAFile ? 'Поменять выбранную фотография' : 'Выбрать фотографию'}
      </button>
    </div>
  )
}
