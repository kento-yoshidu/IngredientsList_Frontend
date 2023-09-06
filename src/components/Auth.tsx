import { useState, FormEvent } from "react"
import useMutateAuth from '../hooks/useMutateAuth'

import Layout from "./Layout"

import styles from "../styles/style.module.css"
import formStyles from "../styles/form.module.css"
import { Link } from "react-router-dom"

const Auth = () => {
  const [username, setUsername] = useState("")
  const [pw, setPw] = useState("")
  const { loginMutation } = useMutateAuth()

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    loginMutation.mutate({
      username: username,
      password: pw,
    })
  }

  return (
    <Layout>
      <div className={styles.wrapper}>
        <form
          className={formStyles.form}
          onSubmit={submitAuthHandler}
        >
          <h2 className={formStyles.formTitle}>ログイン</h2>

          <div className={formStyles.wrapper}>
            <label htmlFor="username">ユーザーID</label><br />
            <input
              id="username"
              className={formStyles.input}
              name="username"
              type="text"
              autoFocus
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className={formStyles.wrapper}>
            <label htmlFor="password">パスワード</label><br />
            <input
              id="password"
              className={formStyles.input}
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>

          <button
            className={formStyles.button}
            disabled={!username || !pw}
            type="submit"
          >
            ログイン
          </button>
        </form>

        <Link
          to="/signup"
          className={styles.link}
        >
          ユーザー登録はこちらから
        </Link>
      </div>
    </Layout>
  )
}

export default Auth
