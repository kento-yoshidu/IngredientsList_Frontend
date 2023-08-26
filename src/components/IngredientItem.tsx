import { memo, useState } from 'react'
import { Ingredient } from '../types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

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
    <li
      className={listStyle.listItem}
      onClick={clickHandle}
    >
        <span className="font-bold">{ingredientname}</span>
      {/*
      <label htmlFor={`item-${id}`}>
      </label>

      <input
        id={`item-${id}`}
        style={{ display: "none" }}
        type="checkbox"
        checked={isShouldBy}
      />
  */}

      {isShouldBy ? (
        <span className={listStyle.stockNone}>
          ストックなし <FontAwesomeIcon icon={faSquare} className={listStyle.icon} />
        </span>
      ) : (
        <span className={listStyle.stockOk}>
          ストックあり <FontAwesomeIcon icon={faSquareCheck} className={listStyle.icon}/>
          </span>
      )}
    </li>
  )
}

export const IngreItem = memo(IngredientItemMemo)
