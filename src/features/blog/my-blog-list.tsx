import { twMerge } from 'tailwind-merge'
import { BlogCard } from './compose/blog-card'
import { useMyBlogs } from './model/model'
import { prependUrl } from '@/shared/lib/helpers/prepend.helper'

export const MyBlogList = () => {
  const { data, isFetching } = useMyBlogs()
  return (
    <div
      className={twMerge(
        'w-full min-h-0 flex-1 pb-2 overflow-hidden overflow-y-auto'
      )}
    >
      {isFetching
        ? 'Загрузка...'
        : data?.map(blog => (
            <BlogCard
              key={blog._id}
              blogId={blog._id}
              authorImage={''}
              authorName={blog.userId.name}
              authorId={blog.userId._id}
              me
              createDate={blog.createdAt}
              blogImage={prependUrl(blog.image[0])}
              blogTitle={blog.title}
              blogText={blog.text}
              likeCount={blog.likeCount}
              commentCount={blog.commentCount}
            />
          ))}
      {data?.length === 0 && (
        <span>
          У вас нет блогов, можете создать первый свой блог прямо сейчас!
        </span>
      )}
    </div>
  )
}
