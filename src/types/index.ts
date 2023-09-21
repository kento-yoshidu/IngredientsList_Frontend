export type Dish = {
  id: number
  dishname: string
  created_at: Date
  updated_at: Date
}

export type Ingredient = {
  id: number
  ingredientname: string
  shouldbuy: boolean
  dishName?: string
}

export type IngredientItem = {
  id: number
  ingredientname: string
  shouldbuy: boolean
  dishname: string
}

export type CsrfToken = {
  csrf_token: string
}

export type Credential = {
  username: string
  password: string
}
