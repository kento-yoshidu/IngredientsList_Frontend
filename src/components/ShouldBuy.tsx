import Layout from "./Layout"

import useQueryShouldBuyIngre from "../hooks/useQueryShouldbuyIngre"

import Style from "../styles/style.module.css"

const ShouldBuy = () => {
  const { data, isLoading } = useQueryShouldBuyIngre()

  console.log(data)

  return (
    <Layout>
      <div className={Style.wrapper}>
        <h2 className={Style.pageTitle}>必要な食材一覧</h2>

        {data && data.map((ingre) => {
          return (
            <p>{ingre.ingredientname}</p>
          )
        })}
      </div>
    </Layout>
  )
}

export default ShouldBuy
