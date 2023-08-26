import { memo, useState } from 'react'
import { Ingredient } from '../types'

import useStore from '../store'

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

  const updateIngre = useStore((state) => state.updateEditedIngre)

  return (
    <li
      key={id}
      className={listStyle.listItem}
    >
      <div onClick={clickHandle}>
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

      <button
        onClick={() => {
          updateIngre({
            id: id,
            ingredientname: ingredientname,
            shouldbuy: shouldbuy
          })
        }}
      >
        修正
      </button>

    </li>
  )
}

export const IngreItem = memo(IngredientItemMemo)
