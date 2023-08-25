import { FC, memo } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '../store'
import { Dish } from '../types'
import { useMutateDish } from '../hooks/useMutateDish'
import { Link } from 'react-router-dom'

const DishItemMemo: FC<Omit<Dish, 'created_at' | 'updated_at'>> = ({
  id,
  dishname,
}) => {
  const updateDish = useStore((state) => state.updateEditedDish)
  const { deleteDishMutation } = useMutateDish()

  return (
    <li className="my-3">
      <Link to={`/dish/${id}/ingredients`}>
        <span className="font-bold">★ {dishname}</span>
      </Link>

      <div className="flex float-right ml-20">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            updateDish({
              id: id,
              dishname: dishname,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteDishMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}

export const DishItem = memo(DishItemMemo)
