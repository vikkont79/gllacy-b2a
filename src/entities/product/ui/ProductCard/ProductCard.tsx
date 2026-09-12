import Image from 'next/image'
import { IconButton } from '@/shared/ui'
import type { Product } from '@/entities/product/types'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <Image
        className={styles.img}
        src={`/${product.image}`}
        width={168}
        height={168}
        alt={product.name}
      />
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.purchase}>
        <p className={styles.price}>{product.price / 100} ₽/кг</p>
        <IconButton
          className={styles.button}
          icon="cart"
          iconSize={16}
          iconLabel="Корзина."
          variant="secondary"
        />
      </div>
    </article>
  )
}

export { ProductCard }