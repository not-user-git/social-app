import { twMerge } from 'tailwind-merge'

import { prependUrl } from '@/shared/lib/helpers/prepend.helper'

import { BlogCard } from './blog-card'
import { useMyBlogs } from '../model'

export const MyBlogList = () => {
  const { data, isFetching } = useMyBlogs()

  return (
    <div
      className={twMerge(
        'w-full min-h-0 flex-1 overflow-y-scroll',
        !data?.length && 'flex justify-center items-center text-center'
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
      {!data?.length && (
        <span className='text-neutral-800 text-lg'>
          У вас нет блогов, можете создать первый свой блог прямо сейчас!
        </span>
      )}
    </div>
  )
}
