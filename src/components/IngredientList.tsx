import { FormEvent } from 'react'
import { useParams } from "react-router-dom"
import useStore from '../store'
import useQueryIngredients from "../hooks/useQueryIngredients"
import { IngreItem } from "./IngredientItem"
import useMutateIngredient from '../hooks/useMutateIngre'

import Layout from "./Layout"

import styles from "../styles/style.module.css"
import listStyle from "../styles/list.module.css"
import formStyle from "../styles/form.module.css"

const IngredientList = () => {
  const { editedIngre } = useStore()
  const updateIngre = useStore((state) => state.updateEditedIngre)

  const { id } = useParams()
  const { data, isLoading } = useQueryIngredients(Number(id))
  const { createIngredientMutation, updateIngredientMutation } = useMutateIngredient()

  const submitDishHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedIngre.id === 0)
      createIngredientMutation.mutate({
        ingredientname: editedIngre.ingredientname
      })
    else {
      updateIngredientMutation.mutate(editedIngre)
    }
  }

  return (
    <Layout>
      <div className={styles.wrapper}>
        {data?.length === 0 ? (
          <p>食材が登録されていません</p>
        ) : (
          <>
            {!isLoading && (
              <>
                {data![0].dishname && (
                  <p className={styles.pageTitle}>
                    ✨{data![0].dishname}✨ の食材リスト
                  </p>
                )}
              </>
            )}

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className={listStyle.list}>
                {data?.map((ing) => (
                  <IngreItem
                    key={`key-${ing.id}`}
                    id={ing.id}
                    ingredientname={ing.ingredientname}
                    shouldbuy={ing.shouldbuy}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <div className={styles.wrapper}>
        <form
          className={formStyle.form}
          onSubmit={submitDishHandler}
        >
          <h2 className={formStyle.formTitle}>食材を追加する</h2>

          <input
            name="ingredientname"
            placeholder="dishName ?"
            type="text"
            onChange={(e) => updateIngre({ ...editedIngre, ingredientname: e.target.value })}
            value={editedIngre.ingredientname || ''}
          />

          <button
            disabled={!editedIngre.ingredientname}
          >
            追加する
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default IngredientList
