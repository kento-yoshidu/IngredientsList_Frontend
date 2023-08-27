import { memo, useState } from 'react'
import { Ingredient } from '../types'

import useStore from '../store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import useMutateIngredient from "../hooks/useMutateIngre"

import listStyle from "../styles/list.module.css"
import { useParams } from 'react-router-dom'

const IngredientItemMemo = ({
  id,
  ingredientname,
  shouldbuy
}: Ingredient) => {
  const [isShouldBy, setIsShouldBy] = useState(shouldbuy)

  const clickHandle = () => {
    setIsShouldBy(!isShouldBy)
  }

  const updateIngre = useStore((state) => state.updateEditedIngre)

  const dishId = useParams()

  const { deleteIngredientMutation } = useMutateIngredient()

  return (
    <li
      key={id}
      className={listStyle.listItem}
    >
      <div
        className={listStyle.itemLeft}
        onClick={clickHandle}
      >
        <span className="font-bold">{ingredientname}</span>

        {isShouldBy ? (
          <span className={listStyle.stockNone}>
            ストックなし <FontAwesomeIcon icon={faSquare} className={listStyle.icon} />
          </span>
        ) : (
          <span className={listStyle.stockOk}>
            ストックあり <FontAwesomeIcon icon={faSquareCheck} className={listStyle.icon}/>
            </span>
        )}
      </div>

      <div className={listStyle.itemRight}>
        <FontAwesomeIcon
          icon={faPencil}
          onClick={() => {
            updateIngre({
              id: id,
              ingredientname: ingredientname,
              shouldbuy: shouldbuy,
              dishId: dishId.id
            })
          }}
        />

        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            deleteIngredientMutation.mutate(id)
          }}
          aria-label="食材を削除する"
        />
      </div>

    </li>
  )
}

export const IngreItem = memo(IngredientItemMemo)
