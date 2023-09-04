import { useLocation } from "react-router-dom"

import Logout from "./LogOut"

import styles from "../styles/header.module.css"

const Header = () => {
  const path = useLocation()


  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>My Go App</h1>
      <p className={styles.notice}>Version 0.1.0</p>

      {path.pathname !== "/" && (
        <Logout />
      )}
    </header>
  )
}

export default Header
