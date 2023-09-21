import { useLocation } from "react-router-dom"

import LogoutButton from "./LogOutButton"

import styles from "../styles/header.module.css"

const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>食材メモアプリ(仮)</h1>
      <p className={styles.notice}>Version 0.1.0</p>

      {(pathname === "/" || "/signup") && (
        <div className={styles.introduction}>
          <p>スーパーに着いてから「何買うんだっけ？」って思い出せないことありませんか？冷蔵庫にストックされていない食材をメモできるアプリです。</p>
        </div>
      )}

      {pathname !== "/" && pathname !== "/signup" && (
        <LogoutButton />
      )}
    </header>
  )
}

export default Header
