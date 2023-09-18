import { create } from 'zustand'

type EditedDish = {
  id: number
  dishname: string
}

type EditedIngre = {
  id: number
  ingredientname: string
  shouldbuy: boolean
  dishId?: string
}

type State = {
  editedDish: EditedDish
  editedIngre: EditedIngre
  dishName: string

  updateEditedDish: (payload: EditedDish) => void
  updateEditedIngre: (payload: EditedIngre) => void
  setDishName: (payload: string) => void

  resetEditedDish: () => void
  resetEditedIngre: () => void
}

const useStore = create<State>((set) => ({
  editedDish: { id: 0, dishname: '' },
  editedIngre: { id: 0, ingredientname: '', shouldbuy: true },
  dishName: "DishName",

  updateEditedDish: (payload) =>
    set({
      editedDish: payload,
    }),
  updateEditedIngre: (payload) =>
    set({
      editedIngre: payload,
    }),
  setDishName: (payload) =>
    set({
      dishName: payload
    }),
  resetEditedDish: () => set({ editedDish: { id: 0, dishname: '' } }),
  resetEditedIngre: () => set({ editedIngre: { id: 0, ingredientname: '', shouldbuy: true } }),
}))

export default useStore
