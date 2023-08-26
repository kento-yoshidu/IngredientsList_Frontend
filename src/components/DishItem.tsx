import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import useStore from '../store'
import useMutateDish from '../hooks/useMutateDish'

import { Dish } from '../types'

const DishItemMemo: FC<Omit<Dish, 'created_at' | 'updated_at'>> = ({
  id,
  dishname,
}) => {
  const updateDish = useStore((state) => state.updateEditedDish)
  const { deleteDishMutation } = useMutateDish()

  return (
    <li style={{ margin: "30px auto", border: "1px solid #444" }}>
      <Link to={`/dish/${id}/ingredients`}>
        <span className="font-bold">★ {dishname}</span>
      </Link>

      <div>
        <button
          onClick={() => {
            updateDish({
              id: id,
              dishname: dishname,
            })
          }}
        >
          修正する
        </button>

        <button
          onClick={() => {
            deleteDishMutation.mutate(id)
          }}
        >
          削除する
        </button>
      </div>
    </li>
  )
}

export const DishItem = memo(DishItemMemo)
