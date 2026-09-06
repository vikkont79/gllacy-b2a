import { products } from '../../lib/products'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './CatalogList.module.css'

interface CatalogListProps {
  className?: string
}

const CatalogList = ({ className }: CatalogListProps) => {
  return (
    <ul className={`${styles.catalog} ${className || ''}`.trim()}>
      {products.map((product) => ( 
        <li key={product.id} className={styles.item}>
          <ProductCard key={product.id} product={product} />
        </li>
      ))}
    </ul>
    )
}

export { CatalogList }
