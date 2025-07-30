import { Link } from 'react-router'
import { ROUTES } from '@/shared/model/routes'
import { useUser } from '@/app/model/auth.store'
import { User } from './ui/header-user'
import { Button } from '@/shared/ui/button'

export const Header = () => {
  const isAuth = useUser(state => state.isAuth)
  const user = useUser(state => state.user)
  return (
    <header className='w-full py-3 px-3 md:px-3 flex items-center justify-center bg-white border-b-1 border-neutral-200 select-none'>
      <div className='custom-container flex justify-between items-center'>
        <Link to={ROUTES.HOME}>
          <section className='relative flex items-center gap-2 sm:gap-3'>
            <img
              src='/icons/app-icon.svg'
              alt='App icon'
              className='size-8 md:size-10'
            />
            <h1 className='text-xl md:text-2xl text-neutral-800 font-semibold'>
              Voqs
              <span className='text-primary'>y</span>
            </h1>
            <span className='absolute right-0 text-[12px] md:text-sm text-beta uppercase translate-y-[-10px] translate-x-[20px] rotate-26 font-semibold'>
              Beta
            </span>
          </section>
        </Link>
        {isAuth ? (
          <User
            email={user.email ? user.email : 'Неизвестно'}
            name={user.name ? user.name : 'Гость'}
          />
        ) : (
          <section className='flex gap-3'>
            <Button mode='link' path={ROUTES.LOGIN} variant='second'>
              Войти
            </Button>
            <Button mode='link' path={ROUTES.REGISTER} variant='first'>
              Регистрация
            </Button>
          </section>
        )}
      </div>
    </header>
  )
}
