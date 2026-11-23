'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Icon } from '@/shared/ui'

import { getCartCount } from '../../api/getCartCount'
import {
  CART_CHANGED_EVENT,
  CART_COUNT_REFRESH_MS,
  type CartChangedDetail,
} from '../../lib'
import styles from './CartCounter.module.css'

interface CartCounterProps {
  /** класс кнопки из модуля хедера: свой CSS-модуль сюда не импортируется */
  className?: string
}

const loadCount = async (): Promise<number | null> => {
  try {
    const result = await getCartCount()

    return result.success ? result.count : null
  } catch {
    // Сеть/сервер недоступны: оставляем последнее известное значение.
    return null
  }
}

const CartCounter = ({ className = '' }: CartCounterProps) => {
  const [count, setCount] = useState<number | null>(null)
  const lastFetchedAt = useRef(0)

  const refresh = useCallback(async () => {
    const now = Date.now()

    if (now - lastFetchedAt.current < CART_COUNT_REFRESH_MS) return

    lastFetchedAt.current = now

    const next = await loadCount()

    if (next !== null) setCount(next)
  }, [])

  useEffect(() => {
    const now = Date.now()

    if (now - lastFetchedAt.current >= CART_COUNT_REFRESH_MS) {
      lastFetchedAt.current = now

      void loadCount().then((next) => {
        if (next !== null) setCount(next)
      })
    }

    const handleChanged = (event: Event) => {
      const detail = (event as CustomEvent<CartChangedDetail>).detail

      setCount(detail.count)
      lastFetchedAt.current = Date.now()
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') void refresh()
    }

    window.addEventListener(CART_CHANGED_EVENT, handleChanged)
    window.addEventListener('focus', handleVisibility)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener(CART_CHANGED_EVENT, handleChanged)
      window.removeEventListener('focus', handleVisibility)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [refresh])

  const badge =
    count !== null && count > 0 ? (count > 99 ? '99+' : String(count)) : null

  return (
    <Button
      className={`${styles.counter} ${className}`.trim()}
      variant="transparent"
      href="/cart"
    >
      <Icon name="cart" size={16} className={styles.icon} />
      <span className={styles.label}>Корзина</span>
      {badge !== null && <span className={styles.badge}>{badge}</span>}
    </Button>
  )
}

export { CartCounter }
