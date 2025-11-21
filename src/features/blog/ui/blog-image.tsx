import { prependUrl } from '@/shared/lib/helpers/prepend.helper'

export const BlogImage = ({ images }: { images: string[] }) => {
  const image = prependUrl(images[0])
  return (
    <section className='flex h-[200px] sm:h-[550px] mx-auto rounded-md overflow-hidden'>
      <div
        key={image}
        className="keen-slider__slide relative w-full flex flex-shrink-0 items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat before:absolute before:content-[''] before:inset-0 before:backdrop-blur-xl"
        style={{ backgroundImage: `url(${encodeURI(image)})` }}
      >
        <img
          draggable={false}
          src={image}
          alt={images[0]}
          className='object-cover z-10 h-full'
        />
      </div>
    </section>
  )
}
