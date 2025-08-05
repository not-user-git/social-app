import type { User } from '@/shared/model/types'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@/features/auth/ui/input'
import { PhoneInput } from '@/features/auth/ui/phone-input'
import { useUser } from '@/shared/stores/auth.store'
import { useEdit } from '../model'
import { useEffect } from 'react'

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
    defaultValues: {
      name: '',
      email: '',
      lname: '',
      login: '',
      password: '',
      phone: ''
    },
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
  }, [isAuth])

  const onSubmit = (data: User) => {
    edit(data)
    reset()
  }

  return (
    <form
      className='flex flex-col gap-5 w-full sm:w-1/2 sm:pl-4'
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

      <Controller
        name='email'
        control={control}
        rules={{
          required: 'Email обязателен',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Некорректный email'
          }
        }}
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
        rules={{
          required: 'Имя обязательно',
          minLength: {
            value: 2,
            message: 'Минимум 2 символа'
          },
          maxLength: {
            value: 18,
            message: 'Максимум 18 символов'
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'Допустимы только латинские буквы, без пробелов и символов'
          }
        }}
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
        rules={{
          required: 'Фамилия обязательна',
          minLength: {
            value: 2,
            message: 'Минимум 2 символа'
          },
          maxLength: {
            value: 20,
            message: 'Максимум 20 символов'
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'Допустимы только латинские буквы, без пробелов и символов'
          }
        }}
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
        rules={{
          required: 'Номер телефона обязателен',
          minLength: {
            value: 18,
            message: 'Длина номера телефона должна быть 18 символов'
          }
        }}
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
