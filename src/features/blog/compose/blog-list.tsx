import { useUser } from '@/shared/stores/auth.store'
import { prependUrl } from '@/shared/lib/helpers/prepend.helper'

import { BlogCard } from './blog-card'
import { useBlogs } from '../model'
import { BlogCardSkeleton } from '../ui/blog-card-skeleton'

export const BlogList = () => {
  const { data, isFetching } = useBlogs()
  const userId = useUser(state => state.user._id)

  return (
    <div className='flex-1 overflow-y-scroll min-h-0 py-3 sm:py-0'>
      {isFetching ? (
        <BlogCardSkeleton />
      ) : (
        data?.map(blog => (
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
        ))
      )}
    </div>
  )
}
