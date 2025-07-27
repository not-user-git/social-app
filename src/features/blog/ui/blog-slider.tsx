import { prependUrl } from '@/shared/lib/helpers/prepend.helper'

export const BlogSlider = ({ images }: { images: string[] }) => {
  return (
    <section className='flex h-[200px] sm:h-[550px] mx-auto rounded-md overflow-hidden'>
      <div
        key={prependUrl(images[0])}
        className="keen-slider__slide relative w-full flex flex-shrink-0 items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat before:absolute before:content-[''] before:inset-0 before:backdrop-blur-md"
        style={{ backgroundImage: `url(${encodeURI(prependUrl(images[0]))})` }}
      >
        <img
          src={prependUrl(images[0])}
          alt={images[0]}
          className='object-cover z-10 h-full'
        />
      </div>
    </section>
  )
}
