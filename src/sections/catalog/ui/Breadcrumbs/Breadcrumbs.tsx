import { Link } from '@/shared/ui'
import styles from './Breadcrumbs.module.css'

interface BreadcrumbsProps {
  className?: string
  crumb: string
}

const Breadcrumbs = ({ className = '', crumb }: BreadcrumbsProps) => {
  return (
    <ul className={`${styles.list} ${className || ''}`.trim()}>
      <li className={styles.item}>
        <Link href="/" className={styles.link}>Главная</Link>
      </li>
      <li className={styles.item}>
        <Link href="/products" className={styles.link}>Каталог</Link>
      </li>
      <li className={`${styles.item} ${styles.current}`}>
        <span className={styles.link}>{crumb}</span>
      </li>
    </ul>
  )
}

export { Breadcrumbs }
