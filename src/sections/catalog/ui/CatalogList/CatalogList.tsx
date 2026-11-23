import { ProductCard, type ProductRow } from '@/entities/product'
import { AddToCartButton } from '@/features/cart'
import styles from './CatalogList.module.css'

interface CatalogListProps {
  className?: string
  products: ProductRow[]
}

const CatalogList = ({ className = '', products }: CatalogListProps) => {
  return (
    <ul className={`${styles.catalog} ${className}`.trim()}>
      {products.map((product, index) => (
        <li key={product.id} className={styles.item}>
          <ProductCard
            product={product}
            priority={index === 0}
            cartAction={
              <AddToCartButton
                productId={product.id}
                disabled={!product.isAvailable}
                iconOnly
              />
            }
          />
        </li>
      ))}
    </ul>
  )
}

export { CatalogList }
