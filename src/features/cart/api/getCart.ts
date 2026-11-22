import 'server-only'

import { inArray } from 'drizzle-orm'

import { db } from '@db/client'
import { products } from '@db/schema'
import { redis } from '@/shared/lib/redis'

import { calculateCartTotal, cartKey } from '../lib'
import type { CartItem, CartSnapshot } from '../types'
import { readGuestId } from './guestId'

export type GetCartResult =
  | { success: true; cart: CartSnapshot }
  | { success: false; error: string }

const emptyCart = (): CartSnapshot => ({ items: [], total: 0, count: 0 })

/*
 * Хеш хранит «productId → кг». Upstash парсит значения из JSON сам,
 * но приводим к числу явно: в Redis теоретически могло попасть что угодно.
 */
const toQuantities = (stored: Record<string, unknown> | null) => {
  const quantities = new Map<number, number>()

  if (!stored) return quantities

  for (const [field, value] of Object.entries(stored)) {
    const productId = Number(field)
    const quantity = Number(value)

    if (
      Number.isInteger(productId) &&
      productId > 0 &&
      Number.isInteger(quantity) &&
      quantity > 0
    ) {
      quantities.set(productId, quantity)
    }
  }

  return quantities
}

export const getCart = async (): Promise<GetCartResult> => {
  try {
    const guestId = await readGuestId()

    if (!guestId) return { success: true, cart: emptyCart() }

    const key = cartKey(guestId)
    const quantities = toQuantities(
      await redis.hgetall<Record<string, unknown>>(key),
    )

    if (quantities.size === 0) {
      return { success: true, cart: emptyCart() }
    }

    const ids = [...quantities.keys()]
    const rows = await db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        image: products.image,
        price: products.price,
        isAvailable: products.isAvailable,
      })
      .from(products)
      .where(inArray(products.id, ids))

    const items: CartItem[] = rows
      .map((row) => ({
        productId: row.id,
        slug: row.slug,
        name: row.name,
        image: row.image,
        price: row.price,
        quantity: quantities.get(row.id) ?? 0,
        isAvailable: row.isAvailable,
      }))
      .filter((item) => item.quantity > 0)
      .sort((a, b) => a.name.localeCompare(b.name, 'ru'))

    // Товар удалили из БД — вычищаем «висячий» id, чтобы не тянуть его вечно.
    const found = new Set(rows.map((row) => row.id))
    const dangling = ids.filter((id) => !found.has(id)).map(String)

    if (dangling.length > 0) {
      await redis.hdel(key, ...dangling)
    }

    return {
      success: true,
      cart: {
        items,
        total: calculateCartTotal(items),
        count: items.length,
      },
    }
  } catch (error) {
    console.error('Ошибка чтения корзины', error)
    return { success: false, error: 'Не удалось загрузить корзину' }
  }
}
