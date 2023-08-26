import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import useStore from '../store'
import useError from './useError'

import { Dish } from '../types'

const useMutateDish = () => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const resetEditedDish = useStore((state) => state.resetEditedDish)

  const createDishMutation = useMutation(
    (dish: Omit<Dish, 'id' | 'created_at' | 'updated_at'>) =>
      axios.post<Dish>(`${process.env.REACT_APP_API_URL}/dish`, dish),
    {
      onSuccess: (res) => {
        const previousDishs = queryClient.getQueryData<Dish[]>(['dishes'])
        if (previousDishs) {
          queryClient.setQueryData(['dishes'], [...previousDishs, res.data])
        }
        resetEditedDish()
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

  const updateDishMutation = useMutation(
    (dish: Omit<Dish, 'created_at' | 'updated_at'>) =>
      axios.put<Dish>(`${process.env.REACT_APP_API_URL}/dish/${dish.id}`, {
        dishname: dish.dishname,
      }),
    {
      onSuccess: (res, variables) => {
        const previousDishs = queryClient.getQueryData<Dish[]>(['dishes'])
        if (previousDishs) {
          queryClient.setQueryData<Dish[]>(
            ['dishes'],
            previousDishs.map((dish) =>
              dish.id === variables.id ? res.data : dish
            )
          )
        }
        resetEditedDish()
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

  const deleteDishMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/dish/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousDishs = queryClient.getQueryData<Dish[]>(['dishes'])

        if (previousDishs) {
          queryClient.setQueryData<Dish[]>(
            ['dishes'],
            previousDishs.filter((dish) => dish.id !== variables)
          )
        }
        resetEditedDish()
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
    createDishMutation,
    updateDishMutation,
    deleteDishMutation,
  }
}

export default useMutateDish
