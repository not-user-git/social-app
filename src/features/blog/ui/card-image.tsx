import { useRef, useState, useEffect } from 'react'

interface Props {
  image: string
}

export const CardImage = ({ image }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const imageElement = useRef<HTMLImageElement>(null)

  const handleLoad = () => {
    setIsImageLoaded(true)
  }

  useEffect(() => {
    const img = imageElement.current
    if (!img) return

    img.addEventListener('load', handleLoad)

    return () => {
      img.removeEventListener('load', handleLoad)
    }
  }, [image, imageElement])

  return (
    <figure
      className={`relative h-full max-h-[500px] overflow-hidden ${!isImageLoaded && 'min-h-[300px]'}`}
    >
      <img
        draggable={false}
        ref={imageElement}
        src={image}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => console.error('Ошибка загрузки')}
        className={`w-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        alt='Alt'
      />

      {!isImageLoaded && (
        <div className='absolute inset-0 bg-neutral-300 animate-pulse'></div>
      )}
    </figure>
  )
}
