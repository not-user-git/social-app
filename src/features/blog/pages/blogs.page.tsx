import { BlogList } from '../compose/blog-list'

const BlogsPage = () => {
  return (
    <div className='flex-1 flex flex-col gap-5 pl-0 pb-0 sm:pl-3 sm:pb-3 min-h-0'>
      <BlogList />
    </div>
  )
}

export default BlogsPage
