import { getProducts } from '@/entities/product/api/getProducts'
import { ProductCard } from '@/entities/product'
import styles from './Tastes.module.css'

const Tastes = async () => {
  const items = (await getProducts()).slice(0, 4)

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