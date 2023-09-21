import { memo, useState } from 'react'
import { Ingredient } from '../types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import useMutateIngredient from "../hooks/useMutateIngre"

import listStyle from "../styles/list.module.css"

const IngredientItemMemo = ({
  id,
  ingredientname,
  shouldbuy,
  dishName
}: Ingredient) => {
  const [isShouldBy, setIsShouldBy] = useState(shouldbuy)

  const clickHandle = () => {
    setIsShouldBy(!isShouldBy)

    const obj = {
      id,
      ingredientname,
      shouldbuy: !isShouldBy
    }

    updateIngredientMutation.mutate(obj)
  }

  const { updateIngredientMutation } = useMutateIngredient()
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
        <span className="font-bold">{ingredientname}
          {dishName && (
            <>
            （{dishName}）
            </>
          )}
        </span>

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
