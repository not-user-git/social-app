import { toast } from 'react-hot-toast'

export const confirmLogout = (onConfirm: () => void) => {
  toast(
    t => (
      <div className='w-max flex items-center gap-4'>
        <span className='text-sm'>Вы уверены, что хотите выйти?</span>
        <button
          onClick={() => {
            toast.dismiss(t.id)
            onConfirm()
          }}
          className='bg-primary leading-none text-white px-3 py-1.5 rounded text-sm cursor-pointer'
        >
          Да
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='border border-neutral-300 text-neutral-600 leading-none px-3 py-1.5 rounded text-sm cursor-pointer'
        >
          Нет
        </button>
      </div>
    ),
    {
      duration: Infinity,
      position: 'top-center',
      id: 'confirm-logout'
    }
  )
}
