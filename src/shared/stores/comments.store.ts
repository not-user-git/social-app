import { create } from 'zustand'

interface CommentsState {
  isEditMode: boolean
  _id: string | null
  value: string | null
  setId: (id: string | null) => void
  editMode: (value: string | null) => void
  cancelEditMode: () => void
}

export const useCommentStore = create<CommentsState>(set => ({
  isEditMode: false,
  value: null,
  _id: null,
  setId: id => set({ _id: id }),
  editMode: value => set({ isEditMode: true, value }),
  cancelEditMode: () => set({ isEditMode: false, _id: null, value: null })
}))
