import { useParams } from "react-router-dom"
import { useQueryIngredients } from "../hooks/useQueryIngredients"
import { IngreItem } from "./IngreItem"

import Layout from "./Layout"

export const Ingredients = () => {
  const { id } = useParams()

  const { data, isLoading } = useQueryIngredients(Number(id))

  return (
    <Layout>
      {data?.length === 0 ? (
        <p>食材が登録されていません</p>
      ) : (
        <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
          {!isLoading && (
            <div className="flex items-center my-3">
              {data![0].dishname && (
                <p style={{ fontSize: "1.5rem" }}>
                  ✨<span style={{ fontWeight: "bold" }}>{data![0].dishname}</span>✨
                  の食材リスト
                </p>
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
    </Layout>
  )
}
