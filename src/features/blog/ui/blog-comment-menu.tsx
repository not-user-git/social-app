import type { SetStateAction, Dispatch } from 'react'
import type { UseMutateFunction } from '@tanstack/react-query'
import { Pen, Trash } from 'lucide-react'

interface Props {
  text?: string | null
  id?: string | null
  onDelete: UseMutateFunction<any, Error, string, unknown>
  onEditMode: (value: string | null) => void
  cancelEditMode: () => void
  setId?: (token: string | null) => void
  setState: Dispatch<SetStateAction<boolean>>
}

export const BlogCommentMenu = ({
  setState,
  setId = () => null,
  onEditMode,
  onDelete,
  cancelEditMode,
  text = null,
  id = ''
}: Props) => {
  const handleEditMode = () => {
    setId(id)
    onEditMode(text)
    setState(false)
  }

  const handleDelete = () => {
    onDelete(id ?? '')
    cancelEditMode()
  }

  return (
    <ul className='absolute bg-white flex flex-col translate-y-[100%] border-2 border-beta rounded-md overflow-hidden bottom-[-12%] right-1 min-w-[130px] z-10'>
      <li className='w-full '>
        <button
          onClick={() => {
            setState(false)
            handleDelete()
          }}
          className='w-full hover:bg-beta text-neutral-600 hover:text-white px-3 py-1.5 flex items-center justify-between cursor-pointer'
        >
          <span className='text-sm leading-none'>Удалить</span>
          <Trash className='size-4' />
        </button>
      </li>
      <li className='w-full'>
        <button
          onClick={handleEditMode}
          className='w-full hover:bg-beta text-neutral-600 hover:text-white px-3 py-1.5 flex items-center justify-between cursor-pointer'
        >
          <span className='text-sm leading-none'>Изменить</span>
          <Pen className='size-4' />
        </button>
      </li>
    </ul>
  )
}
