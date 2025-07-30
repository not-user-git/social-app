import { Plus } from 'lucide-react'

import { useModal } from '@/shared/stores/modal.store'
import { useDocumentTitle } from '@/shared/hooks/use-document-title'

import { MyBlogList } from '../compose/my-blog-list'
import { BlogCreateModal } from '../modal/blog-create-modal'

const MyBlogsPage = () => {
  useDocumentTitle('my blogs')

  const openModal = useModal(state => state.openModal)

  return (
    <div className='w-full flex flex-col'>
      <section className='flex justify-between px-4.5 py-4'>
        <h3 className='text-xl text-neutral-900 font-semibold leading-normal'>
          Ваши блоги
        </h3>
        <button
          onClick={() => {
            openModal(<BlogCreateModal />)
          }}
          className='flex items-center justify-center gap-1 text-white rounded-md bg-primary px-4 py-1.5 cursor-pointer'
        >
          <span className='text-sm sm:text-base'>Создать</span>
          <Plus className='size-4 sm:size-5' />
        </button>
      </section>
      <MyBlogList />
    </div>
  )
}

export default MyBlogsPage
