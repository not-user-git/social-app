import type { UserLogin } from '../model/types'
import type { FieldErrors } from 'react-hook-form'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Input } from '@/features/auth/ui/input'
import { useLogin } from '../model/model'

const onError = async (errors: FieldErrors<UserLogin>) => {
  const errorMessages = Object.values(errors).map(
    err => err?.message || 'Неизвестная ошибка'
  )
  errorMessages.forEach(msg => toast.error(msg))
}

export const LoginForm = () => {
  const { mutate: login } = useLogin()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<UserLogin>({
    defaultValues: {
      login: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = (data: UserLogin) => {
    login(data)
    reset()
  }

  return (
    <form
      className='flex flex-col gap-3'
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Controller
        name='login'
        control={control}
        rules={{
          required: 'Логин обязателен',
          minLength: {
            value: 4,
            message: 'Минимум 4 символа'
          },
          maxLength: {
            value: 16,
            message: 'Минимум 16 символов'
          },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Допустимы только буквы, цифры и _'
          }
        }}
        render={({ field }) => (
          <Input
            error={errors.login}
            maxLength={16}
            type='login'
            label='Логин'
            placeholder='example1234'
            field={field}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        rules={{
          required: 'Пароль обязателен',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов'
          },
          maxLength: {
            value: 14,
            message: 'Максимум 14 символов'
          },
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message:
              'Допустимы только латинские буквы и цифры, без пробелов и символов'
          }
        }}
        render={({ field }) => (
          <Input
            error={errors.password}
            maxLength={14}
            type='password'
            label='Пароль'
            placeholder='********'
            field={field}
          />
        )}
      />

      <button
        type='submit'
        className='w-full text-white hover:bg-secondary-back/90 bg-secondary-back py-2 cursor-pointer rounded-lg text-sm font-medium'
      >
        Войти
      </button>
    </form>
  )
}
