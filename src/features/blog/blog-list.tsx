import { useUser } from '@/shared/stores/auth.store'
import { BlogCard } from './compose/blog-card'
import { useBlogs } from './model/model'
import { prependUrl } from '@/shared/lib/helpers/prepend.helper'

export const BlogList = () => {
  const { data, isFetching } = useBlogs()
  const userId = useUser(state => state.user._id)

  return (
    <div className='flex-1 overflow-y-auto min-h-0 py-3'>
      {isFetching
        ? 'Загрузка...'
        : data?.map(blog => (
            <BlogCard
              key={blog._id}
              blogId={blog._id}
              authorImage={''}
              authorName={blog.userId.name}
              authorId={blog.userId._id}
              me={userId === blog.userId._id}
              createDate={blog.createdAt}
              blogImage={prependUrl(blog.image[0])}
              blogTitle={blog.title}
              blogText={blog.text}
              likeCount={blog.likeCount}
              commentCount={blog.commentCount}
            />
          ))}
    </div>
  )
}
