import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQueryIngredients } from "../hooks/useQueryIngredients"
import { IngreItem } from "./IngreItem"
import {
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'

export const Ingredients = () => {
  const { id } = useParams()

  const { data, isLoading } = useQueryIngredients(Number(id))

  console.log("data = ", data)

  return (
    <>
    <h1>ingre</h1>

    {data?.length === 0 ? (
      <p>登録してね</p>
    ) : (
      <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
        {!isLoading && (
          <div className="flex items-center my-3">
            <ShieldCheckIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
            {data![0].dishname && (
              <span className="text-center text-3xl font-extrabold">
                {data![0].dishname}
                リスト
              </span>
            )}
          </div>
        )}

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {data?.map((ing) => (
                <IngreItem
                  id={ing.id}
                  ingredientname={ing.ingredientname}
                  shouldbuy={ing.shouldbuy}
                />
              ))}
            </ul>
          )}
      </div>
    )}
    </>
  )
}
