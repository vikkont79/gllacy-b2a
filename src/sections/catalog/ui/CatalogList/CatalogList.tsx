import { ProductCard } from '@/entities/product'
import type { ProductRow } from '@db/schema'
import styles from './CatalogList.module.css'

interface CatalogListProps {
  className?: string
  products: ProductRow[]
}

const CatalogList = ({ className = '', products }: CatalogListProps) => {
  return (
    <ul className={`${styles.catalog} ${className}`.trim()}>
      {products.map((product) => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export { CatalogList }
