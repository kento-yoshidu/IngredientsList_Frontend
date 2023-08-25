import { ReactNode } from "react"
import Header from "./Header"

import styles from "../styles/layout.module.css"

const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.layout}>
    <Header />

    <main className={styles.main}>
      {children}
    </main>
  </div>
)

export default Layout
