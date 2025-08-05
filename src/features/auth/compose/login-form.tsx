import type { UserLogin } from '../model/types'
import { useForm, Controller } from 'react-hook-form'
import { useLogin } from '../model'

import { Input } from '@/features/auth/ui/input'
import { Button } from '../ui/button'

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
      onSubmit={handleSubmit(onSubmit)}
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

      <Button>
        Войти
      </Button>
    </form>
  )
}
