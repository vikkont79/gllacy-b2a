import { Button, Icon, Link } from '@/shared/ui'
import { ITEMS_PER_PAGE } from '@/shared/config'
import { createCatalogUrl } from '@/sections/catalog/lib'
import type { GetProductsOptions } from '@/entities/product/types'
import styles from './CatalogPagination.module.css'

interface CatalogPaginationProps {
  className?: string
  options: GetProductsOptions
  total: number
}

const CatalogPagination = ({
  className = '',
  options,
  total,
}: CatalogPaginationProps) => {
  const { page = 1, limit = ITEMS_PER_PAGE } = options
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
  const offset = (page - 1) * ITEMS_PER_PAGE
  const activeStart = page
  const activeEnd = Math.min(totalPages, Math.ceil((offset + limit) / ITEMS_PER_PAGE))
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const hasMore = total - offset > limit
  const buildUrl = (params: GetProductsOptions) => createCatalogUrl({ ...options, ...params })
  const isActive = (pageNumber: number) => pageNumber >= activeStart && pageNumber <= activeEnd

  return (
    <div className={`${styles.wrapper} ${className || ''}`.trim()}>
      <div className={styles.spacer}></div>
      {hasMore && (
        <Button href={buildUrl({ limit: limit + ITEMS_PER_PAGE })} className={styles.showMore}>
          Показать ещё
        </Button>
      )}
      <ul className={styles.pagination}>
        <li>
          {page > 1 ? (
            <Link href={buildUrl({ page: page - 1 })} className={`${styles.link} ${styles.prev}`}>
              <Icon name="arrow-left" size={16} />
              <span className="visually-hidden">Предыдущая страница.</span>
            </Link>
          ) : (
            <Link className={`${styles.link} ${styles.prev} ${styles.disabled}`} aria-disabled="true">
              <Icon name="arrow-left" size={16} />
              <span className="visually-hidden">Предыдущая страница недоступна.</span>
            </Link>
          )}
        </li>
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <Link
              href={buildUrl({ page: pageNumber })}
              className={`${styles.link}${isActive(pageNumber) ? ` ${styles.current}` : ''}`}
              aria-current={isActive(pageNumber) ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        <li>
          {page < totalPages ? (
            <Link href={buildUrl({ page: page + 1 })} className={`${styles.link} ${styles.next}`}>
              <Icon name="arrow-right" size={16} />
              <span className="visually-hidden">Следующая страница.</span>
            </Link>
          ) : (
            <Link className={`${styles.link} ${styles.next} ${styles.disabled}`} aria-disabled="true">
              <Icon name="arrow-right" size={16} />
              <span className="visually-hidden">Следующая страница недоступна.</span>
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export { CatalogPagination }
