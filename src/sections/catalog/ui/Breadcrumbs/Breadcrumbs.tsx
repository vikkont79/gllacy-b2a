import { Link } from '@/shared/ui'
import styles from './Breadcrumbs.module.css'

interface BreadcrumbsProps {
  className?: string
}

const Breadcrumbs = ({ className = '' }: BreadcrumbsProps) => {
  return (
    <ul className={`${styles.list} ${className || ''}`.trim()}>
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
