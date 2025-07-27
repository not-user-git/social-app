import { useDocumentTitle } from '@/shared/hooks/use-document-title'
import { Plus } from 'lucide-react'
import { MyBlogList } from './my-blog-list'
import { BlogCreate } from './blog-create'
import { useModal } from '@/shared/stores/modal.store'

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
            openModal(<BlogCreate />)
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
