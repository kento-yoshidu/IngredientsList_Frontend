import { Link } from "react-router-dom"
import Layout from "./components/Layout"
import styles from "./styles/style.module.css"

const Page404 = () => {
  return (
    <Layout>
      <h1 className={styles.pageTitle}>ページが見つかりません。</h1>

      <Link
        to="/dishes"
        className={styles.link}
      >
        料理一覧を見る
      </Link>

      <Link
        to="/"
      >
        ログインページに戻る
      </Link>
    </Layout>
  )
}

export default Page404
