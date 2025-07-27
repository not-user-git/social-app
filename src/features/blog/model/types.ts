export interface User {
  _id: string
  name: string
  firstName: string
}

export interface Like {
  userId: string | null
  blogId: string | null
}

export interface Comments {
  limit: string | null
  page: string | null
  from: string | null
  blogId: string | null
}

export interface Comment {
  text: string | null
  blogId: string | null
  from: string | null
  to: string | null
  createdAt: string | null
  updatedAt: string | null
  __v: string | null
  _id: string | null
}

export interface Blog {
  _id: string
  userId: User
  title: string
  text: string
  image: string[]
  status: number
  __v: number
  comments: string[]
  likeCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

export interface BlogUpload {
  title: string
  text: string
  image: File
}

export interface Blogs {
  blogs: Blog[]
  count: number
  page: number
  limit: number
}
