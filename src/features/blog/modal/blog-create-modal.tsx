import { BlogCreateForm } from '../compose/blog-create-form'

interface Props {
  id?: string
  editMode?: boolean
  title?: string
  text?: string
  prevImage?: string
}

export const BlogCreateModal = ({
  id,
  editMode,
  title,
  text,
  prevImage
}: Props) => {
  return (
    <div className='w-[320px] sm:w-[450px] h-max px-2 pb-2'>
      <h4 className='text-2xl font-semibold text-neutral-800 text-center mb-4'>
        {editMode ? 'Изменить блог' : 'Создать блог'}
      </h4>
      <BlogCreateForm
        _id={id}
        title={title}
        text={text}
        prevImage={prevImage}
        editMode={editMode}
      />
    </div>
  )
}
