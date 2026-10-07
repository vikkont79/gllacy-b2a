import { Link } from '@/shared/ui'
import type { Crumb } from '../types'
import styles from './Breadcrumbs.module.css'

interface BreadcrumbsProps {
  className?: string
  crumbs: readonly Crumb[]
}

const Breadcrumbs = ({ className = '', crumbs }: Readonly<BreadcrumbsProps>) => {
  const lastIndex = crumbs.length - 1

  return (
    <ul className={`${styles.list} ${className || ''}`.trim()}>
      {crumbs.map((crumb, index) =>
        index === lastIndex ? (
          <li key={crumb.name} className={`${styles.item} ${styles.current}`}>
            <span className={styles.link}>{crumb.name}</span>
          </li>
        ) : (
          <li key={crumb.name} className={styles.item}>
            <Link href={crumb.url} className={styles.link}>
              {crumb.name}
            </Link>
          </li>
        ),
      )}
    </ul>
  )
}

export { Breadcrumbs }