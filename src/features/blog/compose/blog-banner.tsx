import { Smile } from 'lucide-react'

interface Props {
  image?: string
  title?: string
}

export const BlogBanner = ({ image, title }: Props) => {
  return (
    <div className='w-65 h-90 bg-white flex items-center justify-center flex-col rounded-md border-2 border-neutral-400 border-dashed'>
      <span className='size-8 text-neutral-400 rotate-180'>
        <Smile className='size-full' />
        {image}
        {title}
      </span>
      <p className='text-xl text-neutral-400 font-semibold'>Здесь пока пусто</p>
    </div>
  )
}
