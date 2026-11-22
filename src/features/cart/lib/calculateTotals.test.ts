import { describe, expect, it } from 'vitest'

import type { CartItem } from '../types'
import { calculateCartTotal, calculateLineTotal } from './calculateTotals'

const item = (patch: Partial<CartItem> = {}): CartItem => ({
  productId: 1,
  slug: 'plombir',
  name: 'Пломбир',
  image: 'products/plombir.png',
  price: 19900,
  quantity: 2,
  isAvailable: true,
  ...patch,
})

describe('calculateLineTotal', () => {
  it('умножает цену за кг на количество', () => {
    expect(calculateLineTotal(item())).toBe(39800)
  })

  it('не считает недоступный товар', () => {
    expect(calculateLineTotal(item({ isAvailable: false }))).toBe(0)
  })
})

describe('calculateCartTotal', () => {
  it('суммирует только доступные позиции', () => {
    const items = [
      item(),
      item({ productId: 2, price: 10000, quantity: 1 }),
      item({ productId: 3, isAvailable: false }),
    ]

    expect(calculateCartTotal(items)).toBe(49800)
  })

  it('пустая корзина — 0', () => {
    expect(calculateCartTotal([])).toBe(0)
  })
})
