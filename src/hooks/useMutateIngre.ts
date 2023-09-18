import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import useStore from '../store'
import useError from './useError'

import { Ingredient } from '../types'
import { useParams } from 'react-router-dom'

const useMutateIngredient = () => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const resetEditedIngredient = useStore((state) => state.resetEditedIngre)

  const dishId = useParams()

  const createIngredientMutation = useMutation(
    (ingredient: Omit<Ingredient, "id" | "created_at" | "updated_at" | "shouldbuy">) =>
      axios.post<Ingredient>(`${process.env.REACT_APP_API_URL}/dish/${dishId.id}/ingredients`, ingredient
    ),
    {
      onSuccess: (res) => {
        const previousIngredients = queryClient.getQueryData<Ingredient[]>([`ingredients-${dishId.id}`])

        if (previousIngredients) {
          queryClient.setQueryData([`ingredients-${dishId.id}`], [...previousIngredients, res.data])
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

  const updateIngredientMutation = useMutation(
    (ingredient: Omit<Ingredient, 'created_at' | 'updated_at'>) =>
      axios.put<Ingredient>(`${process.env.REACT_APP_API_URL}/ingredient/${ingredient.id}`, {
        id: ingredient.id,
        ingredientname: ingredient.ingredientname,
        shouldbuy: ingredient.shouldbuy,
        dishId: dishId.id
      }),
    {
      onSuccess: (res, variables) => {
        const previousIngredients = queryClient.getQueryData<Ingredient[]>([`ingredients-${dishId.id}`])

        if (previousIngredients) {
          queryClient.setQueryData<Ingredient[]>(
            [`ingredients-${dishId.id}`],
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
      axios.delete(`${process.env.REACT_APP_API_URL}/dish/${dishId.id}/ingredient/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousIngredients = queryClient.getQueryData<Ingredient[]>([`ingredients-${dishId.id}`])

        if (previousIngredients) {
          queryClient.setQueryData<Ingredient[]>(
            [`ingredients-${dishId.id}`],
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
    createIngredientMutation,
    updateIngredientMutation,
    deleteIngredientMutation
  }
}

export default useMutateIngredient
