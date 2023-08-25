import { useState, FormEvent } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useMutateAuth } from '../hooks/useMutateAuth'

import Layout from './Layout'

import styles from "../styles/form.module.css"

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
      <div className="flex justify-center items-center flex-col text-gray-600">
        <form onSubmit={submitAuthHandler}>
          <h2 className={styles.formTitle}>{isLogin ? 'ログイン' : "ユーザー登録"}</h2>

          <div className={styles.wrapper}>
            <label htmlFor="username">ユーザーID</label><br />
            <input
              id="username"
              // className="mb-3 px-3 text-sm py-2 border border-gray-300"
              className={styles.input}
              name="username"
              type="text"
              autoFocus
              placeholder="username"
              onChange={(e) => setusername(e.target.value)}
              value={username}
            />
          </div>

          <div className={styles.wrapper}>
            <label htmlFor="password">パスワード</label><br />
            <input
              id="password"
              // className="mb-3 px-3 text-sm py-2 border border-gray-300"
              className={styles.input}
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>

          <button
            // className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600"
            className={styles.button}
            disabled={!username || !pw}
            type="submit"
          >
            {isLogin ? 'ログイン' : '登録'}
          </button>
        </form>
        <ArrowPathIcon
          onClick={() => setIsLogin(!isLogin)}
          className="h-6 w-6 my-2 text-blue-500 cursor-pointer"
        />
      </div>
    </Layout>
  )
}
