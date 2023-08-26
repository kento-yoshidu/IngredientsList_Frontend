import { memo, useState } from 'react'
import { Ingredient } from '../types'

import listStyle from "../styles/list.module.css"

const IngredientItemMemo = ({
  id,
  ingredientname,
  shouldbuy
}: Ingredient) => {
  const [isShouldBy, setIsShouldBy] = useState(shouldbuy)

  const clickHandle = () => {
    setIsShouldBy(!isShouldBy)
  }

  return (
    <li className={listStyle.listItem}>
      <label htmlFor={`item-${id}`}>
        <span className="font-bold">{ingredientname}</span>
      </label>

      <input
        id={`item-${id}`}
        type="checkbox"
        checked={isShouldBy}
        onClick={clickHandle}
      />
    </li>
  )
}

export const IngreItem = memo(IngredientItemMemo)
