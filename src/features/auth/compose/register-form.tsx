import type { User } from '@/shared/model/types'

import { useForm, Controller } from 'react-hook-form'

import { useRegister, RULES } from '../model'

import { PhoneInput } from '../ui/phone-input'
import { Input } from '../ui/input'
import { FileInput } from '../ui/file-input'
import { Button } from '../ui/button'
import { AvatarPreview } from '../ui/avatar-preview'

export const RegisterForm = () => {
  const { mutate: reg } = useRegister()

  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<User>({
    mode: 'onChange'
  })

  const avatar = watch('avatar')?.[0]
  const avatarPreview =
    avatar && typeof avatar === 'object' && avatar
      ? URL.createObjectURL(avatar)
      : null

  const onSubmit = (data: User) => {
    reg(data)
    reset()
  }

  const INPUTS = [
    {
      error: errors.login,
      maxLength: 16,
      type: 'login',
      label: 'Логин',
      placeholder: 'example1234'
    },
    {
      error: errors.password,
      maxLength: 14,
      type: 'password',
      label: 'Пароль',
      placeholder: '********'
    },
    {
      error: errors.email,
      type: 'email',
      label: 'Email',
      placeholder: 'example@mail.com'
    },
    {
      error: errors.name,
      type: 'name',
      label: 'Имя',
      placeholder: 'John'
    },
    {
      error: errors.lname,
      type: 'lname',
      label: 'Фамилия',
      placeholder: 'Doe'
    }
  ]

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      {INPUTS.map((input, index) => (
        <Input
          key={index}
          controller={control}
          error={input.error}
          maxLength={input.maxLength}
          type={input.type}
          label={input.label}
          placeholder={input.placeholder}
        />
      ))}

      <Controller
        name='phone'
        control={control}
        rules={RULES.PHONE}
        render={({ field }) => <PhoneInput label='Номер' field={field} />}
      />

      <Controller
        name='avatar'
        control={control}
        render={({ field }) => (
          <FileInput label='Фотография пользователя' field={field} />
        )}
      />

      <AvatarPreview avatar={avatarPreview} />

      <Button>Зарегистрироваться</Button>
    </form>
  )
}
