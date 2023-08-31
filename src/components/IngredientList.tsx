import { FormEvent, useEffect } from 'react'
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
                  id={ing.id}
                  ingredientname={ing.ingredientname}
                  shouldbuy={ing.shouldbuy}
                />
              ))}
            </ul>
          )}
        </>
      )}

      <hr />

      <form
        className={formStyle.form}
        onSubmit={submitDishHandler}
      >
        <h2 className={formStyle.formTitle}>食材を追加する</h2>

        <input
          name="ingredientname"
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="dishName ?"
          type="text"
          onChange={(e) => updateIngre({ ...editedIngre, ingredientname: e.target.value })}
          value={editedIngre.ingredientname || ''}
        />

        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedIngre.ingredientname}
        >
          追加する
        </button>
      </form>
    </Layout>
  )
}

export default IngredientList
