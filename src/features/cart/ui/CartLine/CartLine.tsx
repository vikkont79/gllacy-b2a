'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { formatPrice } from '@/shared/lib/formatPrice'
import { Button, IconButton } from '@/shared/ui'

import {
  CART_MAX_KG,
  CART_MIN_KG,
  calculateLineTotal,
  parseQuantityInput,
} from '../../lib'
import type { CartItem } from '../../types'
import styles from './CartLine.module.css'

interface CartLineProps {
  readonly item: CartItem
  readonly pending: boolean
  readonly onQuantityChange: (productId: number, quantity: number) => void
  readonly onRemove: (productId: number) => void
}

const CartLine = ({ item, pending, onQuantityChange, onRemove }: CartLineProps) => {
  const [draft, setDraft] = useState(String(item.quantity))
  const [prevQuantity, setPrevQuantity] = useState(item.quantity)

  if (item.quantity !== prevQuantity) {
    setPrevQuantity(item.quantity)
    setDraft(String(item.quantity))
  }

  const lineTotal = calculateLineTotal(item)
  const quantityDisabled = pending || !item.isAvailable

  const commitDraft = () => {
    const next = parseQuantityInput(draft)

    if (next === null || next === item.quantity) {
      setDraft(String(item.quantity))
      return
    }

    onQuantityChange(item.productId, next)
  }

  return (
    <li className={styles.line}>
      <Link href={`/products/${item.slug}`} className={styles.product}>
        <Image
          className={styles.image}
          src={`/${item.image}`}
          width={96}
          height={96}
          alt={item.name}
        />
        <span className={styles.name}>{item.name}</span>
      </Link>

      <div className={styles.meta}>
        {!item.isAvailable && <span className={styles.badge}>Нет в продаже</span>}
        <p className={styles.unitPrice}>{formatPrice(item.price)} / кг</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.stepper}>
          <Button
            variant="transparent"
            size="small"
            aria-label={`Уменьшить количество: ${item.name}`}
            disabled={quantityDisabled || item.quantity <= CART_MIN_KG}
            onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
          >
            -
          </Button>

          <input
            className={styles.quantity}
            inputMode="numeric"
            aria-label={`Килограммы: ${item.name}`}
            value={draft}
            disabled={quantityDisabled}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitDraft}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                commitDraft()
              }

              if (event.key === 'Escape') {
                event.preventDefault()
                setDraft(String(item.quantity))
              }
            }}
          />

          <Button
            variant="transparent"
            size="small"
            aria-label={`Увеличить количество: ${item.name}`}
            disabled={quantityDisabled || item.quantity >= CART_MAX_KG}
            onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
          >
            +
          </Button>
        </div>

        <p className={styles.lineTotal}>{formatPrice(lineTotal)}</p>

        <IconButton
          icon="cross"
          variant="transparent"
          iconSize={16}
          iconLabel={`Удалить ${item.name} из корзины`}
          disabled={pending}
          onClick={() => onRemove(item.productId)}
        />
      </div>
    </li>
  )
}

export { CartLine }
