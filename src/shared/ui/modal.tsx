import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRoot = document.getElementById('modal-root')

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen || !modalRoot) return null

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 cursor-pointer'
      onClick={onClose}
    >
      <div
        className='bg-white p-3 rounded min-w-[300px] cursor-default'
        onClick={e => e.stopPropagation()}
      >
        <button className='text-red-600 cursor-pointer' onClick={onClose}>
          <X />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  )
}
