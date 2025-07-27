export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/registration',
    FINDUSER: '/auth/finduser',
    CHECKUSER: '/auth/checkuser',
    UPDATE: (id: string | number) => `/auth/update/${id}`
  },

  BLOG: {
    ALL: '/blog/all',
    MY: '/blog/my',
    CREATE: '/blog/create',
    FINDONE: (id: string | number) => `/blog/findone/${id}`,
    EDIT: '/blog',
    DELETE: (id: string | number) => `/blog/delete/${id}`,
    CHANGE: (id: string | number) => `/blog/change/${id}`
  },

  COMMENT: {
    ALL: '/comment/all',
    FINDONE: (id: string | number) => `/comment/findone/${id}`,
    CREATE: '/comment/create',
    EDIT: '/comment',
    DELETE: (_id: string | null) => `/comment/delete/${_id}`
  },

  LIKE: '/like',

  HASHTAG: {
    ALL: '/hashtag/',
    FINDONE: '/hashtag/',
    DELETE: (id: string | number) => `/hashtag/${id}`
  }
}
