import { ImageOff } from 'lucide-react'

export const AvatarPreview = ({ avatar }: { avatar: string | null }) => {
  return (
    <div className='size-18 border-2 border-dashed border-neutral-500/40 flex flex-col items-center justify-center gap-2 overflow-hidden'>
      {avatar ? (
        <img draggable={false} src={avatar} alt='Аватарка пользователя' />
      ) : (
        <ImageOff />
      )}
    </div>
  )
}
