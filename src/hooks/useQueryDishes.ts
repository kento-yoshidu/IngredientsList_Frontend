import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Dish } from '../types'
import { useError } from './useError'

export const useQueryDishes = () => {
  const { switchErrorHandling } = useError()
  const getDishs = async () => {
    const { data } = await axios.get<Dish[]>(
      `${process.env.REACT_APP_API_URL}/dishes`,
      { withCredentials: true }
    )
    return data
  }

  return useQuery<Dish[], Error>({
    queryKey: ['dishes'],
    queryFn: getDishs,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}
