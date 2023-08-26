import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import useStore from '../store'
import useError from './useError'

import { Ingredient } from '../types'

const useMutateIngredient = () => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const resetEditedIngredient = useStore((state) => state.resetEditedIngre)

  const updateIngredientMutation = useMutation(
    (ingredient: Omit<Ingredient, 'created_at' | 'updated_at'>) =>
      axios.put<Ingredient>(`${process.env.REACT_APP_API_URL}/ingredient/${ingredient.id}`, {
        ingredientname: ingredient.ingredientname,
      }),
    {
      onSuccess: (res, variables) => {
        const previousIngredients = queryClient.getQueryData<Ingredient[]>(['ingredients'])
        if (previousIngredients) {
          queryClient.setQueryData<Ingredient[]>(
            ['ingredients'],
            previousIngredients.map((ingredient) =>
              ingredient.id === variables.id ? res.data : ingredient
            )
          )
        }
        resetEditedIngredient()
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )

  const deleteIngredientMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/ingredient/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousIngredients = queryClient.getQueryData<Ingredient[]>(['ingredients'])

        if (previousIngredients) {
          queryClient.setQueryData<Ingredient[]>(
            ['ingredients'],
            previousIngredients.filter((ingredient) => ingredient.id !== variables)
          )
        }
        resetEditedIngredient()
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )

  return {
    updateIngredientMutation,
    deleteIngredientMutation
  }
}

export default useMutateIngredient
