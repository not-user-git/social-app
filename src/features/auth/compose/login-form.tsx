import type { UserLogin } from '../model/types'
import { useForm, Controller } from 'react-hook-form'

import { useLogin, RULES } from '../model'

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
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='login'
        control={control}
        rules={RULES.LOGIN}
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
        rules={RULES.PASSWORD}
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

      <Button>Войти</Button>
    </form>
  )
}
