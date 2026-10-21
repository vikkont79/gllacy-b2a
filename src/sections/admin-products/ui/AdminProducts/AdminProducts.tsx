import Image from 'next/image'

import { getAdminProducts } from '@/entities/product/api/getAdminProducts'
import type { AdminProductRow } from '@/entities/product/types'
import { ProductPriceEditor, ProductRowActions } from '@/features/product-admin/ui'
import { Button, ErrorState } from '@/shared/ui'

import styles from './AdminProducts.module.css'

const AdminProducts = async () => {
  let products: AdminProductRow[] = []
  let productsError = false

  try {
    products = await getAdminProducts()
  } catch (error) {
    console.error('AdminProducts: не удалось загрузить товары:', error)
    productsError = true
  }

  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <div className={styles.header}>
        <h1 className="title">Товары</h1>
        <Button href="/admin/products/new">Добавить товар</Button>
      </div>

      {productsError ? (
        <ErrorState message="Не удалось загрузить товары. Попробуйте позже" />
      ) : products.length === 0 ? (
        <p>Пока нет ни одного товара.</p>
      ) : (
        <ul className={styles.list}>
          {products.map((product) => (
            <li
              key={product.id}
              className={`${styles.item} ${product.isAvailable ? '' : styles.hidden}`.trim()}
            >
              <Image
                className={styles.image}
                src={`/${product.image}`}
                alt=""
                width={64}
                height={64}
              />
              <div className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <ProductPriceEditor productId={product.id} price={product.price} />
              </div>
              <ProductRowActions
                productId={product.id}
                isAvailable={product.isAvailable}
                isNew={product.isNew}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export { AdminProducts }
