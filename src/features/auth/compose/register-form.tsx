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
