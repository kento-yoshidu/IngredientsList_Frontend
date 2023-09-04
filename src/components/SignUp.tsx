import { useState } from "react"
import useMutateAuth from "../hooks/useMutateAuth"
import Layout from "./Layout"

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [pw, setPw] = useState("")
  const { loginMutation, registerMutation } = useMutateAuth()

  const submitAuthHandler = async () => {
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
      <h1>ユーザー登録</h1>

      <form>

      </form>
    </Layout>
  )
}

export default SignUp
