export const BlogHashtags = ({ hashtags }: { hashtags: string[] }) => {
  return (
    <div className='flex flex-wrap gap-1.5 mb-2 leading-none'>
      {hashtags.map(hashtag => (
        <span
          key={hashtag}
          className='bg-primary/90 text-sm text-neutral-100 rounded-full font-semibold px-2.5 py-0.5'
        >
          {hashtag}
        </span>
      ))}
    </div>
  )
}
