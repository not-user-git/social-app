import { useParams } from 'react-router'

import { useDocumentTitle } from '@/shared/hooks/use-document-title'
import { useParsedBlogContent } from '@/features/blog/model/hooks/use-parsed-blog-content'

import { useBlog } from '../model'
import { BlogImage } from '../ui/blog-image'
import { BlogHashtags } from '../ui/blog-hashtags'

const BlogPage = () => {
  const { id } = useParams()
  const { data: blog, isFetching } = useBlog(id ?? '')
  useDocumentTitle(blog ? blog.title : 'Blog')
  const { text, hashtags } = useParsedBlogContent(blog?.text || '')

  return (
    <div className='flex-1 overflow-x-hidden px-2 mt-2 sm:pr-2 pb-2'>
      {isFetching ? (
        'Загрузка...'
      ) : (
        <>
          <BlogImage images={blog ? blog.image : []} />
          <article className='mt-3'>
            <BlogHashtags hashtags={hashtags} />
            <h3 className='text-2xl sm:text-3xl text-neutral-800 font-semibold leading-none'>
              {blog ? blog.title : 'Загрузка...'}
            </h3>
            <p className='text-sm sm:text-base mt-2 text-neutral-800 font-semibold break-words leading-none'>
              {text}
            </p>
          </article>
        </>
      )}
    </div>
  )
}

export default BlogPage
