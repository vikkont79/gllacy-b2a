import { getProducts } from '@/entities/product/api/getProducts'
import { ProductCard } from '@/entities/product'
import type { Product } from '@/entities/product/types'
import styles from './Tastes.module.css'

const Tastes = async () => {
  let items: Product[] = []

  try {
    items = (await getProducts()).slice(0, 4)
  } catch {
    return null
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className={styles.tastes}>
      <h2 className="visually-hidden">Наши лучшие вкусы.</h2>
      <p className={`${styles.title} title`}>
        Попробуйте самые популярные вкусы нашего мороженого
      </p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <ProductCard product={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { Tastes }