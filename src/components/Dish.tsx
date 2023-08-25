import { FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'
import useStore from '../store'
import { useQueryDishes } from '../hooks/useQueryDishes'
import { useMutateDish } from '../hooks/useMutateDish'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { DishItem } from './DishItem'

export const Dish = () => {
  const queryClient = useQueryClient()
  const { editedDish } = useStore()
  const updateDish = useStore((state) => state.updateEditedDish)
  const { data, isLoading } = useQueryDishes()
  const { createDishMutation, updateDishMutation } = useMutateDish()
  const { logoutMutation } = useMutateAuth()

  const submitDishHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedDish.id === 0)
      createDishMutation.mutate({
        dishname: editedDish.dishname,
      })
    else {
      updateDishMutation.mutate(editedDish)
    }
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries(['dishes'])
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center my-3">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">
          リスト
        </span>
      </div>

      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />

      <form onSubmit={submitDishHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="dishName ?"
          type="text"
          onChange={(e) => updateDish({ ...editedDish, dishname: e.target.value })}
          value={editedDish.dishname || ''}
        />

        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedDish.dishname}
        >
          {editedDish.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data?.length === 0 ? (
            <p>料理が登録されていません。</p>
          ) : (
            <ul className="my-5">
              {data?.map((dish) => (
                <DishItem key={dish.id} id={dish.id} dishname={dish.dishname} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
