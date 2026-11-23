import Image from 'next/image'
import { Link } from '@/shared/ui'
import type { ProductRow } from '@/entities/product'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: ProductRow
  priority?: boolean
  cartAction?: React.ReactNode
}

const ProductCard = ({
  product,
  priority = false,
  cartAction,
}: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <Image
        className={styles.img}
        src={`/${product.image}`}
        width={168}
        height={168}
        alt={product.name}
        priority={priority}
      />
      <h3 className={styles.title}>
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
      </h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.purchase}>
        <p className={styles.price}>{product.price / 100} ₽/кг</p>
        {cartAction}
      </div>
    </article>
  )
}

export { ProductCard }