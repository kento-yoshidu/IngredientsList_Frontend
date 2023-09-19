import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import useError from './useError'

import { IngredientItem } from '../types'

const useQueryShouldBuyIngre = () => {
  const { switchErrorHandling } = useError()

  const getIngredients = async () => {
    const { data } = await axios.get<IngredientItem[]>(
      `${process.env.REACT_APP_API_URL}/ingredient/shouldbuy`,
      { withCredentials: true }
    )

    return data
  }

  return useQuery<IngredientItem[], Error>({
    queryKey: [`shouldby`],
    queryFn: getIngredients,
    // cacheTime: 100,
    // staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}

export default useQueryShouldBuyIngre

