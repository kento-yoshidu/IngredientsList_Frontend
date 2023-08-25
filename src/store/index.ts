import { create } from 'zustand'

type EditedDish = {
  id: number
  dishname: string
}

type State = {
  editedDish: EditedDish

  updateEditedDish: (payload: EditedDish) => void

  resetEditedDish: () => void
}

const useStore = create<State>((set) => ({
  editedDish: { id: 0, dishname: '' },
  editedIngredient: { id: 0, ingredientname: '' },
  updateEditedDish: (payload) =>
    set({
      editedDish: payload,
    }),
  resetEditedDish: () => set({ editedDish: { id: 0, dishname: '' } }),
}))

export default useStore
