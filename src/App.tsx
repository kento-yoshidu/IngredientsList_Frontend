import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import Auth from './components/Auth'
import DishList from './components/DishList'
import IngredientList from './components/IngredientList'
import Page404 from './Page404'

import { CsrfToken } from './types'

import "./styles/global.css"
import SignUp from './components/SignUp'

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true

    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }

    getCsrfToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dishes" element={<DishList />} />
        <Route path="/dish/:id/ingredients" element={<IngredientList />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
