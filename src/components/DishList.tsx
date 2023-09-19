import { FormEvent } from 'react'
import useStore from '../store'
import useQueryDishes from '../hooks/useQueryDishes'
import useMutateDish from '../hooks/useMutateDish'

import Layout from './Layout'
import { DishItem } from './DishItem'

import Style from "../styles/style.module.css"
import listStyle from "../styles/list.module.css"
import formStyle from "../styles/form.module.css"
import { Link } from 'react-router-dom'

const DishList = () => {
  const { editedDish } = useStore()
  const updateDish = useStore((state) => state.updateEditedDish)

  const { data, isLoading } = useQueryDishes()
  const { createDishMutation, updateDishMutation } = useMutateDish()

  const submitDishHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedDish.id === 0)
      createDishMutation.mutate({
        dishname: editedDish.dishname,
      })
    else {
      updateDishMutation.mutate(editedDish)
    }
  }

  return (
    <Layout>
      <div className={Style.wrapper}>
        <h2 className={Style.pageTitle}>料理リスト</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data?.length === 0 ? (
              <p>料理が登録されていません。</p>
            ) : (
              <ul className={listStyle.list}>
                {data?.map((dish) => (
                  <DishItem key={dish.id} id={dish.id} dishname={dish.dishname} />
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <Link to="/shouldbuy">
        ストックの食材一覧はこちら
      </Link>

      <div className={Style.wrapper}>
        <form
          className={formStyle.form}
          onSubmit={submitDishHandler}
        >
          <h2 className={formStyle.formTitle}>料理を追加する</h2>

          <input
            placeholder="dishName ?"
            type="text"
            onChange={(e) => updateDish({ ...editedDish, dishname: e.target.value })}
            value={editedDish.dishname || ""}
          />

          <button
            disabled={!editedDish.dishname}
          >
            {editedDish.id === 0 ? 'Create' : 'Update'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default DishList
