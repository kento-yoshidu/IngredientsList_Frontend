import { memo, useState } from 'react'
import { Ingredient } from '../types'

const IngreItemMemo = ({
  id,
  ingredientname,
  shouldbuy
}: Ingredient) => {
  const [isShouldBy, setIsShouldBy] = useState(shouldbuy)

  const clickHandle = () => {
    setIsShouldBy(!isShouldBy)
  }

  return (
    <li className="my-3" key={id}>
      <span className="font-bold">{ingredientname}</span>

      <input
        type="checkbox"
        checked={isShouldBy}
        onClick={clickHandle}
      />
    </li>
  )
}

export const IngreItem = memo(IngreItemMemo)
