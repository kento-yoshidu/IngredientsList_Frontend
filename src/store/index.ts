import { create } from 'zustand'

type EditedDish = {
  id: number
  dishname: string
}

type EditedIngre = {
  id: number
  ingredientname: string
  shouldbuy: boolean
}

type State = {
  editedDish: EditedDish
  editedIngre: EditedIngre

  updateEditedDish: (payload: EditedDish) => void
  updateEditedIngre: (payload: EditedIngre) => void

  resetEditedDish: () => void
  resetEditedIngre: () => void
}

const useStore = create<State>((set) => ({
  editedDish: { id: 0, dishname: '' },
  editedIngre: { id: 0, ingredientname: '', shouldbuy: true },

  updateEditedDish: (payload) =>
    set({
      editedDish: payload,
    }),
  updateEditedIngre: (payload) =>
    set({
      editedIngre: payload,
    }),
  resetEditedDish: () => set({ editedDish: { id: 0, dishname: '' } }),
  resetEditedIngre: () => set({ editedIngre: { id: 0, ingredientname: '', shouldbuy: true } }),
}))

export default useStore
