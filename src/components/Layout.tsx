import { ReactNode } from "react"

import Header from "./Header"
import Footer from "./Footer"

import styles from "../styles/layout.module.css"

const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.layout}>
    <Header />

    <main className={styles.main}>
      {children}
    </main>

    <Footer />
  </div>
)

export default Layout
