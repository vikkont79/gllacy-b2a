import { getProducts } from '@/entities/product/api/getProducts'
import type { Product } from '@/entities/product/types'
import { ErrorState } from '@/shared/ui'
import { CatalogHeader } from '../CatalogHeader/CatalogHeader'
import { CatalogFilter } from '../CatalogFilter/CatalogFilter'
import { CatalogPagination } from '../CatalogPagination/CatalogPagination'
import { CatalogList } from '../CatalogList/CatalogList'
import styles from './Catalog.module.css'

const CatalogPage = async () => {
  let products: Product[] = []
  let productsError = false

  try {
    products = await getProducts()
  } catch (error) {
    console.error('CatalogPage: не удалось загрузить каталог:', error)
    productsError = true
  }

  return (
    <main className="wrapper">
      <CatalogHeader />
      <section className={styles.products}>
        <h2 className="visually-hidden">Список товаров с фильтрами.</h2>
        <CatalogFilter className={styles.filter} />
        {productsError ? (
          <ErrorState message="Не удалось загрузить каталог. Попробуйте позже" />
        ) : products.length === 0 ? (
          <p>Сейчас в продаже нет товаров. Загляните позже</p>
        ) : (
          <CatalogList products={products} />
        )}
        <CatalogPagination className={styles.pagination} />
      </section>
    </main>
  )
}

export { CatalogPage }
