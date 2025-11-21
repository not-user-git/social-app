import { useState } from 'react'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'
import toast from 'react-hot-toast'

import { ROUTES } from '@/shared/model/routes'
import { useParsedBlogContent } from '@/features/blog/model/hooks/use-parsed-blog-content'
import { useModal } from '@/shared/stores/modal.store'
import { useUser } from '@/shared/stores/auth.store'
import { toDefaultDate } from '@/features/blog/model/helpers/to-default-date'

import { useLike, useBlogDelete } from '../model'

import { BlogCommentsModal } from '../modal/blog-comments-modal'
import { BlogCreateModal } from '../modal/blog-create-modal'

import { BlogAuthor } from '../ui/blog-author'
import { BlogInfo } from '../ui/blog-info'
import { BlogOption } from '../ui/blog-option'
import { BlogHashtags } from '../ui/blog-hashtags'
import { BlogCommentMenu } from '../ui/blog-comment-menu'
import { CardImage } from '../ui/card-image'

interface Props {
  blogId: string
  authorImage: string
  authorName: string
  authorId: string
  me?: boolean
  createDate: string
  blogImage: string
  blogTitle: string
  blogText: string
  likeCount: number
  commentCount: number
}

export const BlogCard = ({
  blogId,
  authorImage,
  authorName,
  authorId,
  me,
  createDate,
  blogImage,
  blogTitle,
  blogText,
  likeCount,
  commentCount
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [commCount, setCommCount] = useState<number>(commentCount)

  const link = ROUTES.BLOG.replace(':id', blogId)
  const { text, hashtags } = useParsedBlogContent(blogText)

  const userId = useUser(state => state.user._id)
  const isAuth = useUser(state => state.isAuth)
  const openModal = useModal(state => state.openModal)
  const closeModal = useModal(state => state.closeModal)

  const { mutate: like, data } = useLike()
  const { mutate: deleteBlog } = useBlogDelete()

  return (
    <section className='w-90 mx-auto mb-3 sm:mb-4 bg-white rounded-lg overflow-hidden transition last:mb-0'>
      <div className={twMerge('flex', me ? 'justify-end' : 'justify-start')}>
        {me ? (
          <span className='relative'>
            <button
              className='m-2 cursor-pointer'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <BlogAuthor
                image={authorImage}
                authorName={authorName}
                createDate={toDefaultDate(createDate)}
                me={me ? me : userId === authorId}
              />
            </button>
            {isMenuOpen && (
              <BlogCommentMenu
                setState={setIsMenuOpen}
                cancelEditMode={closeModal}
                onDelete={() => deleteBlog(blogId)}
                onEditMode={() =>
                  openModal(
                    <BlogCreateModal
                      editMode
                      id={blogId}
                      title={blogTitle}
                      text={blogText}
                      prevImage={blogImage}
                    />
                  )
                }
              />
            )}
          </span>
        ) : (
          <article className='m-2'>
            <BlogAuthor
              image={authorImage}
              authorName={authorName}
              createDate={toDefaultDate(createDate)}
              me={me ? me : userId === authorId}
            />
          </article>
        )}
      </div>

      {isAuth ? (
        <Link to={link}>
          <CardImage image={blogImage} />

          <article className='mx-3 sm:mx-4 mt-2'>
            {hashtags && <BlogHashtags hashtags={hashtags} />}
            <BlogInfo title={blogTitle} text={text} />
          </article>
        </Link>
      ) : (
        <span
          className='cursor-pointer'
          onClick={() => {
            toast.dismiss()
            toast.error('Вы не авторизованы, авторизуйтесь чтобы открыть блог!')
          }}
        >
          <CardImage image={blogImage} />

          <article className='mx-3 sm:mx-4 mt-2'>
            {hashtags && <BlogHashtags hashtags={hashtags} />}
            <BlogInfo title={blogTitle} text={text} />
          </article>
        </span>
      )}

      <menu className='relative h-max mx-1 sm:mx-2 my-2 leading-none z-10'>
        <ul className='flex gap-2'>
          <li>
            <BlogOption
              handleClick={() => like({ blogId, userId })}
              data={data}
              type='like'
              counter
              likeCount={likeCount}
            />
          </li>
          <li>
            <BlogOption
              handleClick={() =>
                isAuth
                  ? openModal(
                      <BlogCommentsModal
                        setCommentCount={setCommCount}
                        blogId={blogId}
                        from={userId}
                        limit={'10'}
                        page={'1'}
                      />
                    )
                  : toast.error(
                      'Вы не авторизованы, нельзя писать комментарий!'
                    )
              }
              type='comment'
              counter
              commentCount={commCount}
            />
          </li>
          <li>
            <BlogOption handleClick={() => null} type='share' counter={false} />
          </li>
        </ul>
      </menu>
    </section>
  )
}
