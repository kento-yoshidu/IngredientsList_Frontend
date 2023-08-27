import { useState, FormEvent } from 'react'
import useMutateAuth from '../hooks/useMutateAuth'

import Layout from './Layout'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import styles from "../styles/form.module.css"

const Auth = () => {
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
      <div>
        <form onSubmit={submitAuthHandler}>
          <h2 className={styles.formTitle}>{isLogin ? 'ログイン' : "ユーザー登録"}</h2>

          <div className={styles.wrapper}>
            <label htmlFor="username">ユーザーID</label><br />
            <input
              id="username"
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
              className={styles.input}
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>

          <button
            className={styles.button}
            disabled={!username || !pw}
            type="submit"
          >
            {isLogin ? 'ログイン' : '登録'}
          </button>
        </form>

        <FontAwesomeIcon
          style={{ fontSize: "3rem", textAlign: "center" }}
          icon={faArrowsRotate}
          onClick={() => setIsLogin(!isLogin)}
        />

      </div>
    </Layout>
  )
}

export default Auth
