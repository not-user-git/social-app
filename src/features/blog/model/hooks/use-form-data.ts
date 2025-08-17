import type { BlogUpload } from '../types'

interface Props {
  data: BlogUpload
  prevImage: string
  _id: string
  editMode: boolean
}

export const useFormData = () => {
  return ({ data, prevImage, _id, editMode }: Props) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('text', data.text)
    formData.append('image', data.image || prevImage)
    if (editMode) formData.append('_id', _id)
    return formData
  }
}
