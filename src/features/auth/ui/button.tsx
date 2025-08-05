export const Button = ({ children }: { children: string }) => {
  return (
    <button
      type='submit'
      className='w-full text-white hover:bg-secondary-back/90 bg-secondary-back py-2 cursor-pointer rounded-lg text-sm font-medium'
    >
      {children}
    </button>
  )
}
