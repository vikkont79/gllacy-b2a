import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import styles from './CatalogHeader.module.css'

const CatalogHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className="visually-hidden">Каталог продукции.</h1>
      <Breadcrumbs className={styles.breadcrumbs} />
      <p className={`${styles.title} title`}>Сливочное мороженое</p>
    </header>
  )
}

export { CatalogHeader }