import { useDocumentTitle } from '@/shared/hooks/use-document-title'
import { BlogList } from './blog-list'

const BlogsPage = () => {
  useDocumentTitle('home')

  return (
    <div className='flex-1 flex flex-col gap-5 pl-0 pb-0 sm:pl-3 sm:pb-3 min-h-0'>
      <BlogList />
    </div>
  )
}

export default BlogsPage
