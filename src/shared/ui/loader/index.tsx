import { TransformDots } from '@/shared/ui/transform-dots'
import { TransformBlocks } from '@/shared/ui/transform-blocks'

type variants = 'dots' | 'blocks'

interface Props {
  text: string
  variant: variants
}

export const Loader = ({ text, variant }: Props) => {
  return (
    <div className='w-full h-dvh flex flex-col gap-2 items-center justify-center'>
      {variant === 'dots' ? <TransformDots /> : <TransformBlocks />}
      <span className='text-neutral-black'>
        {text}
        <span className='animate-pulse'>.</span>
        <span className='animate-pulse animate-delay-100'>.</span>
        <span className='animate-pulse animate-delay-200'>.</span>
      </span>
    </div>
  )
}
