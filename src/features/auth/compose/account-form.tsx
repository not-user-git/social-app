import type { User } from '@/shared/model/types'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { useEdit, RULES } from '../model'
import { useUser } from '@/shared/stores/auth.store'

import { Input } from '@/features/auth/ui/input'
import { PhoneInput } from '@/features/auth/ui/phone-input'

export const AccountForm = () => {
  const isAuth = useUser(state => state.isAuth)
  const user = useUser(state => state.user)

  const { mutate: edit } = useEdit()

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<User>({
    mode: 'onChange'
  })

  useEffect(() => {
    if (isAuth)
      reset({
        email: user.email,
        lname: user.lname,
        name: user.name,
        login: user.login,
        phone: user.phone
      })
  }, [isAuth, reset, user])

  const onSubmit = (data: User) => {
    edit(data)
    reset()
  }

  return (
    <form
      className='flex flex-col gap-5 w-full sm:w-1/2'
      onSubmit={handleSubmit(onSubmit)}
    >
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

      <Controller
        name='email'
        control={control}
        rules={RULES.EMAIL}
        render={({ field }) => (
          <Input
            field={field}
            label='Email'
            type='email'
            placeholder='example@mail.com'
            error={errors.email}
          />
        )}
      />

      <Controller
        name='name'
        control={control}
        rules={RULES.NAME}
        render={({ field }) => (
          <Input
            field={field}
            maxLength={18}
            label='Имя'
            type='name'
            placeholder='John'
            error={errors.name}
          />
        )}
      />

      <Controller
        name='lname'
        control={control}
        rules={RULES.LNAME}
        render={({ field }) => (
          <Input
            field={field}
            maxLength={20}
            label='Фамилия'
            type='lname'
            placeholder='Doe'
            error={errors.lname}
          />
        )}
      />

      <Controller
        name='phone'
        control={control}
        rules={RULES.PHONE}
        render={({ field }) => <PhoneInput label='Номер' field={field} />}
      />

      <button
        type='submit'
        className='w-full text-white hover:bg-primary/90 bg-primary py-2 cursor-pointer rounded-lg text-sm text-center font-medium'
      >
        Редактировать
      </button>
    </form>
  )
}
