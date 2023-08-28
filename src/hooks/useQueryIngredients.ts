import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import useError from './useError'

import { IngredientItem } from '../types'

const useQueryIngredients = (dishId: number) => {
  const { switchErrorHandling } = useError()

  const getIngredients = async () => {
    const { data } = await axios.get<IngredientItem[]>(
      `${process.env.REACT_APP_API_URL}/dish/${dishId}/ingredients`,
      { withCredentials: true }
    )
    return data
  }

  return useQuery<IngredientItem[], Error>({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}

export default useQueryIngredients
