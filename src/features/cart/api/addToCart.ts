'use server'

import { redis } from '@/shared/lib/redis'

import {
  CART_MAX_KG,
  CART_TTL_SECONDS,
  CART_USER_TTL_SECONDS,
  clampQuantity,
} from '../lib'
import { cartProductIdSchema, type CartMutationResult } from '../types'
import { resolveCartOwner } from './cartOwner'
import { getProductAvailability } from './getProductAvailability'

export const addToCart = async (
  productId: number,
): Promise<CartMutationResult> => {
  const parsed = cartProductIdSchema.safeParse(productId)

  if (!parsed.success) {
    return { success: false, error: 'Товар не найден' }
  }

  try {
    const availability = await getProductAvailability(parsed.data)

    if (availability === null) {
      return { success: false, error: 'Товар не найден' }
    }

    if (!availability) {
      return { success: false, error: 'Товар снят с продажи' }
    }

    const owner = await resolveCartOwner({
      createGuest: true,
      clearMergedCookie: true,
    })
    const key = owner.key

    if (!key) {
      return { success: false, error: 'Не удалось добавить товар' }
    }

    const field = String(parsed.data)
    const stored = await redis.hget<number>(key, field)
    const current = typeof stored === 'number' ? stored : 0

    if (current >= CART_MAX_KG) {
      return { success: false, error: `Максимум ${CART_MAX_KG} кг` }
    }

    const incremented = await redis.hincrby(key, field, 1)
    const quantity = clampQuantity(incremented)

    // Гонка двух вкладок: HINCRBY уже записал, поэтому подрезаем и перезаписываем.
    if (quantity !== incremented) {
      await redis.hset(key, { [field]: quantity })
    }

    const count = await redis.hlen(key)
    const ttl =
      owner.type === 'user' ? CART_USER_TTL_SECONDS : CART_TTL_SECONDS

    await redis.expire(key, ttl)

    return { success: true, quantity, count }
  } catch (error) {
    console.error(`Ошибка добавления товара ${productId} в корзину`, error)
    return { success: false, error: 'Не удалось добавить товар' }
  }
}
