import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import styles from './CatalogHeader.module.css'

interface CatalogHeaderProps {
  title: string
  className?: string
}

const CatalogHeader = ({ title, className = '' }: CatalogHeaderProps) => {
  return (
    <header className={`${styles.header} ${className || ''}`.trim()}>
      <h1 className="visually-hidden">Каталог продукции.</h1>
      <Breadcrumbs className={styles.breadcrumbs} crumb={title} />
      <p className={`${styles.title} title`}>{title}</p>
    </header>
  )
}

export { CatalogHeader }