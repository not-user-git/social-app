interface Props {
  title: string
  text: string
}

export const BlogInfo = ({ title, text }: Props) => {
  return (
    <>
      <h4 className='text-xl text-neutral-900 font-semibold leading-none'>
        {title ? title : 'Без заголовка'}
      </h4>
      <p className='text-sm text-neutral-700 mt-2 max-w-[95%] whitespace-nowrap overflow-hidden text-ellipsis leading-normal'>
        {text ? text : 'Без текста'}
      </p>
    </>
  )
}
