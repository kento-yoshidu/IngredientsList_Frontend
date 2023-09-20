import Layout from "./Layout"

import useQueryShouldBuyIngre from "../hooks/useQueryShouldbuyIngre"

import Style from "../styles/style.module.css"
import listStyle from "../styles/list.module.css"
import { IngreItem } from "./IngredientItem"

const ShouldBuy = () => {
  const { data, isLoading } = useQueryShouldBuyIngre()

  return (
    <Layout>
      <div className={Style.wrapper}>
        <h2 className={Style.pageTitle}>ストックがない食材一覧</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data?.length === 0 ? (
              <p>食材は全て揃っています⭕</p>
            ): (
              <ul className={listStyle.list}>
                {data?.map((ingre) => {
                  const ingredientname = `${ingre.ingredientname}（${ingre.dishname}）`

                  return (
                    <IngreItem
                      id={ingre.id}
                      ingredientname={ingredientname}
                      shouldbuy={ingre.shouldbuy}
                    />
                  )
                  })}
              </ul>
            )}
          </>
          )}
      </div>
    </Layout>
  )
}

export default ShouldBuy
