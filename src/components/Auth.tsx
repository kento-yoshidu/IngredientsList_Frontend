import { useState, FormEvent } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useMutateAuth } from '../hooks/useMutateAuth'

import Layout from './Layout'

export const Auth = () => {
  const [username, setusername] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation } = useMutateAuth()

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        username: username,
        password: pw,
      })
    } else {
      await registerMutation
        .mutateAsync({
          username: username,
          password: pw,
        })
        .then(() =>
          loginMutation.mutate({
            username: username,
            password: pw,
          })
        )
    }
  }

  return (
    <Layout>
      <div className="flex justify-center items-center flex-col text-gray-600 font-mono">
        <h2 className="my-6">{isLogin ? 'Login' : 'Create a new account'}</h2>

        <form onSubmit={submitAuthHandler}>
          <div>
            <input
              className="mb-3 px-3 text-sm py-2 border border-gray-300"
              name="username"
              type="text"
              autoFocus
              placeholder="username address"
              onChange={(e) => setusername(e.target.value)}
              value={username}
            />
          </div>

          <div>
            <input
              className="mb-3 px-3 text-sm py-2 border border-gray-300"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>
          <div className="flex justify-center my-2">
            <button
              className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600"
              disabled={!username || !pw}
              type="submit"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>

        <ArrowPathIcon
          onClick={() => setIsLogin(!isLogin)}
          className="h-6 w-6 my-2 text-blue-500 cursor-pointer"
        />
      </div>
    </Layout>
  )
}
