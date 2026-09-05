import { products } from '../../lib/products'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { CatalogFilter } from '../CatalogFilter/CatalogFilter'
import { CatalogPagination } from '../CatalogPagination/CatalogPagination'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './Catalog.module.css'

const CatalogPage = () => {
  return (
    <main className="wrapper">
      <header className={styles.header}>
        <h1 className="visually-hidden">Каталог.</h1>
        <Breadcrumbs />
        <h2 className={styles.title}>Сливочное мороженое</h2>
      </header>

      <section className={styles.products}>
        <h2 className="visually-hidden">Список товаров с фильтрами.</h2>
        <CatalogFilter />
        <ul className={styles.catalog}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        <CatalogPagination />
      </section>
    </main>
  )
}

export { CatalogPage }