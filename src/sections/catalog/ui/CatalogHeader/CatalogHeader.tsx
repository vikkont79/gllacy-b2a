import type { Crumb } from '@/sections/catalog/lib/createBreadcrumbs'
import { DEFAULT_CATALOG_TITLE } from '@/shared/config'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import styles from './CatalogHeader.module.css'

interface CatalogHeaderProps {
  crumbs: readonly Crumb[]
  className?: string
}

const CatalogHeader = ({ crumbs, className = '' }: CatalogHeaderProps) => {
  const title = crumbs[crumbs.length - 1]?.name ?? DEFAULT_CATALOG_TITLE

  return (
    <header className={`${styles.header} ${className || ''}`.trim()}>
      <h1 className="visually-hidden">Каталог продукции.</h1>
      <Breadcrumbs className={styles.breadcrumbs} crumbs={crumbs} />
      <p className={`${styles.title} title`}>{title}</p>
    </header>
  )
}

export { CatalogHeader }