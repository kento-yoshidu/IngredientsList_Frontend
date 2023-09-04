import { FormEvent, useState } from "react"
import useMutateAuth from "../hooks/useMutateAuth"

import Layout from "./Layout"

import styles from "../styles/style.module.css"
import formStyles from "../styles/form.module.css"
import { Link } from "react-router-dom"

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [pw, setPw] = useState("")
  const { loginMutation, registerMutation } = useMutateAuth()

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

  return (
    <Layout>
      <h2 className={formStyles.formTitle}>ユーザー登録</h2>

      <form onSubmit={submitAuthHandler}>
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
          ユーザー登録
        </button>
      </form>

      <Link
        to="/"
        className={styles.link}
      >
        ログインこちらから
      </Link>
    </Layout>
  )
}

export default SignUp
