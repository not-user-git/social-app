import { Link } from 'react-router'
import { useDocumentTitle } from '@/shared/hooks/use-document-title'
import { ROUTES } from '@/shared/model/routes'
import { AuthLayout } from './ui/auth-layout'
import { RegisterForm } from './compose/register-form'

const RegisterPage = () => {
  useDocumentTitle('register')
  return (
    <AuthLayout>
      <section className='w-full sm:w-100 h-max flex flex-col gap-5 p-4 border-2 border-border rounded-lg'>
        <article className='leading-none'>
          <h1 className='text-base text-neutral-800 font-semibold mb-1.5 leading-none'>
            Регистрация
          </h1>
          <p className='text-sm text-neutral-500 leading-normal'>
            Введите ваши данные для регистрации в системе
          </p>
        </article>
        <RegisterForm />
        <p className='text-sm text-neutral-500'>
          Уже есть аккаунт?{' '}
          <Link
            replace
            className='text-neutral-800 underline mx-2'
            to={ROUTES.LOGIN}
          >
            Войти
          </Link>
          |
          <Link
            replace
            className='text-neutral-800 underline ml-2'
            to={ROUTES.HOME}
          >
            Главная страница
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}

export default RegisterPage
