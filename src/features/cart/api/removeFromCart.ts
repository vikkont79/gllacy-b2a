'use server'

import { redis } from '@/shared/lib/redis'

import { cartKey, CART_TTL_SECONDS } from '../lib'
import { cartProductIdSchema, type CartMutationResult } from '../types'
import { readGuestId } from './guestId'

export const removeFromCart = async (
  productId: number,
): Promise<CartMutationResult> => {
  const parsed = cartProductIdSchema.safeParse(productId)

  if (!parsed.success) {
    return { success: false, error: 'Товар не найден' }
  }

  try {
    const guestId = await readGuestId()

    if (!guestId) {
      return { success: true, quantity: 0, count: 0 }
    }

    const key = cartKey(guestId)
    await redis.hdel(key, String(parsed.data))

    const count = await redis.hlen(key)

    if (count > 0) {
      await redis.expire(key, CART_TTL_SECONDS)
    }

    return { success: true, quantity: 0, count }
  } catch (error) {
    console.error(`Ошибка удаления товара ${productId} из корзины`, error)
    return { success: false, error: 'Не удалось удалить товар' }
  }
}
