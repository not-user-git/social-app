export const RULES = {
  LOGIN: {
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
  },
  PASSWORD: {
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
  },
  EMAIL: {
    required: 'Email обязателен',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Некорректный email'
    }
  },
  NAME: {
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
  },
  LNAME: {
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
  },
  PHONE: {
    required: 'Номер телефона обязателен',
    minLength: {
      value: 18,
      message: 'Длина номера телефона должна быть 18 символов'
    }
  }
}
