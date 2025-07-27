import { useModal } from '@/shared/stores/modal.store'
import { Modal } from '@/shared/ui/modal'

export const GlobalModal = () => {
  const { isOpen, content, closeModal } = useModal()

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {content}
    </Modal>
  )
}
