import { Plus } from 'lucide-react'

import { useModal } from '@/shared/stores/modal.store'

import { MyBlogList } from '../compose/my-blog-list'
import { BlogCreateModal } from '../modal/blog-create-modal'

const MyBlogsPage = () => {
  const openModal = useModal(state => state.openModal)

  return (
    <div className='w-full flex-1 flex flex-col gap-3 px-3 pb-3 sm:pr-0'>
      <section className='flex justify-between'>
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
