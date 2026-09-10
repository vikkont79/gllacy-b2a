import { ProductCard } from '@/entities/product'
import type { Product } from '@/entities/product/types'
import styles from './CatalogList.module.css'

interface CatalogListProps {
  className?: string
  products: Product[]
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
