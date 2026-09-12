import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'

import styles from './Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <a href="#content" className={styles.skip}>
        Перейти к содержимому
      </a>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export { Layout }
