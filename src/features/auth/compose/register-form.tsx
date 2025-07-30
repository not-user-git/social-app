import type { User } from '@/shared/model/types'
import { useForm, Controller, type FieldErrors } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { PhoneInput } from '@/features/auth/ui/phone-input'
import { FileInput } from '../ui/file-input'
import { Input } from '@/features/auth/ui/input'
import { ImageOff } from 'lucide-react'
import { useRegister } from '../model'

const onError = async (errors: FieldErrors<User>) => {
  const errorMessages = Object.values(errors).map(
    err => err?.message || 'Неизвестная ошибка'
  )
  errorMessages.forEach(msg => toast.error(msg))
}

export const RegisterForm = () => {
  const { mutate: reg } = useRegister()
  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<User>({
    defaultValues: {
      avatar: '',
      name: '',
      email: '',
      lname: '',
      login: '',
      password: '',
      phone: ''
    },
    mode: 'onChange'
  })

  const avatar = watch('avatar')?.[0]
  const avatarPreview =
    avatar && typeof avatar === 'object' && (avatar as any) instanceof Blob
      ? URL.createObjectURL(avatar)
      : null

  const onSubmit = (data: User) => {
    reg(data)
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

      <Controller
        name='avatar'
        control={control}
        render={({ field }) => (
          <FileInput label='Фотография пользователя' field={field} />
        )}
      />

      <div className='size-18 border-2 border-dashed border-neutral-500/40 flex flex-col items-center justify-center gap-2 overflow-hidden'>
        {avatarPreview ? (
          <img src={avatarPreview} alt='Аватарка пользователя' />
        ) : (
          <ImageOff className='text-neutral-500/40' />
        )}
      </div>

      <button
        type='submit'
        className='w-full text-white hover:bg-secondary-back/90 bg-secondary-back py-2 cursor-pointer rounded-lg text-sm font-medium'
      >
        Зарегистрироваться
      </button>
    </form>
  )
}
