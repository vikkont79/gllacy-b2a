import { getCart } from '@/features/cart/api/getCart'
import { CartView } from '@/features/cart'
import { ErrorState } from '@/shared/ui'

import styles from './CartPage.module.css'

const CartPage = async () => {
  const result = await getCart()

  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <h1 className={`title ${styles.title}`}>Корзина</h1>
      {result.success ? (
        <CartView cart={result.cart} />
      ) : (
        <ErrorState message={result.error} />
      )}
    </main>
  )
}

export { CartPage }
