import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import useStore from '../store'
import useMutateDish from '../hooks/useMutateDish'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

import { Dish } from '../types'

import listStyle from "../styles/list.module.css"

const DishItemMemo: FC<Omit<Dish, 'created_at' | 'updated_at'>> = ({
  id,
  dishname,
}) => {
  const updateDish = useStore((state) => state.updateEditedDish)
  const { deleteDishMutation } = useMutateDish()

  return (
    <li className={listStyle.listItem}>
      <Link to={`/dish/${id}/ingredients`}>
        <span className="font-bold">{dishname}</span>
      </Link>

      <button
        onClick={() => {
          updateDish({
            id: id,
            dishname: dishname,
          })
        }}
      >
        <FontAwesomeIcon icon={faPencil} />
      </button>

      <FontAwesomeIcon
        role="button"
        icon={faTrash}
        onClick={() => {
          deleteDishMutation.mutate(id)
        }}
      />
    </li>
  )
}

export const DishItem = memo(DishItemMemo)
