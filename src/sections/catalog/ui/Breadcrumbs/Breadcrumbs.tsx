import { Link } from '@/shared/ui'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/" className={styles.link}>Главная</Link>
      </li>
      <li className={styles.item}>
        <Link href="/catalog" className={styles.link}>Каталог</Link>
      </li>
      <li className={`${styles.item} ${styles.current}`}>
        <span className={styles.link}>Сливочное мороженое</span>
      </li>
    </ul>
  )
}

export { Breadcrumbs }