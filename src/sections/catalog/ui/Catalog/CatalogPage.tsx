import { getProducts } from '@/entities/product/api/getProducts'
import { CatalogHeader } from '../CatalogHeader/CatalogHeader'
import { CatalogFilter } from '../CatalogFilter/CatalogFilter'
import { CatalogPagination } from '../CatalogPagination/CatalogPagination'
import { CatalogList } from '../CatalogList/CatalogList'
import styles from './Catalog.module.css'

const CatalogPage = async () => {
  const products = await getProducts()

  return (
    <main className="wrapper">
      <CatalogHeader />
      <section className={styles.products}>
        <h2 className="visually-hidden">Список товаров с фильтрами.</h2>
        <CatalogFilter className={styles.filter} />
        <CatalogList products={products} />
        <CatalogPagination className={styles.pagination} />
      </section>
    </main>
  )
}

export { CatalogPage }