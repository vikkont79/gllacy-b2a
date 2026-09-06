import { Link } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui'
import styles from './CatalogPagination.module.css'

interface CatalogPaginationProps {
  className?: string
}

const pages = [1, 2, 3, 4, 5]

const CatalogPagination = ({ className = '' }: CatalogPaginationProps) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`.trim()}>
      <div className={styles.spacer}></div>
      <Button
        className={styles.showMore}
        variant="transparent"
      >
        Показать ещё
      </Button>
      <ul className={styles.pagination}>
        <li>
          <Link href="/catalog" className={`${styles.link} ${styles.prev} ${styles.disabled}`}>
            <Icon name="arrow-left" size={16} />
            <span className="visually-hidden">Предыдущая страница.</span>
          </Link>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <Link
              href="/catalog"
              className={`${styles.link}${page === 1 ? ` ${styles.current}` : ''}`}
            >
              {page}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/catalog" className={`${styles.link} ${styles.next}`}>
            <Icon name="arrow-right" size={16} />
            <span className="visually-hidden">Следующая страница.</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export { CatalogPagination }