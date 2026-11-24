'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { formatPrice } from '@/shared/lib/formatPrice'
import { Button, ConfirmModal } from '@/shared/ui'

import { clearCart } from '../../api/clearCart'
import { removeFromCart } from '../../api/removeFromCart'
import { setCartQuantity } from '../../api/setCartQuantity'
import { calculateCartTotal, notifyCartChanged } from '../../lib'
import type { CartSnapshot } from '../../types'
import { CartLine } from '../CartLine/CartLine'
import styles from './CartView.module.css'

interface CartViewProps {
  readonly cart: CartSnapshot
}

const CLEAR_CART_MODAL_ID = 'clear-cart-modal'

const CartView = ({ cart }: CartViewProps) => {
  const router = useRouter()
  const [items, setItems] = useState(cart.items)
  const [serverItems, setServerItems] = useState(cart.items)
  const [pendingId, setPendingId] = useState<number | 'clear' | null>(null)
  const [isPending, startTransition] = useTransition()

  if (cart.items !== serverItems) {
    setServerItems(cart.items)
    setItems(cart.items)
  }

  const total = calculateCartTotal(items)
  const busy = isPending || pendingId !== null

  const runMutation = (id: number | 'clear', action: () => Promise<void>) => {
    startTransition(() => {
      setPendingId(id)
      void action().finally(() => setPendingId(null))
    })
  }

  const handleQuantityChange = (productId: number, quantity: number) => {
    runMutation(productId, async () => {
      const result = await setCartQuantity(productId, quantity)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      setItems((current) =>
        current.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      )
      notifyCartChanged(result.count)
      router.refresh()
    })
  }

  const handleRemove = (productId: number) => {
    runMutation(productId, async () => {
      const result = await removeFromCart(productId)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      setItems((current) =>
        current.filter((item) => item.productId !== productId),
      )
      notifyCartChanged(result.count)
      router.refresh()
    })
  }

  const handleClear = () => {
    runMutation('clear', async () => {
      const result = await clearCart()

      if (!result.success) {
        toast.error(result.error)
        return
      }

      setItems([])
      notifyCartChanged(0)
      router.refresh()
    })
  }

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <p className={styles.emptyText}>В корзине пока пусто.</p>
        <Button href="/products">В каталог</Button>
      </section>
    )
  }

  return (
    <section className={styles.cart}>
      <div className={styles.topBar}>
        <p className={styles.count}>Позиций: {items.length}</p>
        <Button
          variant="transparent"
          popoverTarget={CLEAR_CART_MODAL_ID}
          disabled={busy}
        >
          Очистить корзину
        </Button>
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <CartLine
            key={item.productId}
            item={item}
            pending={busy}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))}
      </ul>

      <aside className={styles.summary} aria-live="polite">
        <p className={styles.totalLabel}>Итого</p>
        <p className={styles.totalValue}>{formatPrice(total)}</p>
        <p className={styles.totalNote}>Недоступные товары в сумму не входят.</p>
      </aside>

      <ConfirmModal
        id={CLEAR_CART_MODAL_ID}
        title="Очистить корзину?"
        message="Все товары будут удалены из корзины."
        confirmLabel="Очистить"
        pending={pendingId === 'clear'}
        onConfirm={handleClear}
      />
    </section>
  )
}

export { CartView }
