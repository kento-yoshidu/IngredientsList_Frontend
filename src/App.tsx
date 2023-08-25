import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Dish } from './components/Dish'
import { Ingredients } from './components/Ingredients'
import axios from 'axios'
import { CsrfToken } from './types'

import "./styles/global.css"

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
        <Route path="/dishes" element={<Dish />} />
        <Route path="/dish/:id/ingredients" element={<Ingredients />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
