'use server'

import { redis } from '@/shared/lib/redis'

import { CART_TTL_SECONDS, CART_USER_TTL_SECONDS } from '../lib'
import { cartProductIdSchema, type CartMutationResult } from '../types'
import { resolveCartOwner } from './cartOwner'

export const removeFromCart = async (
  productId: number,
): Promise<CartMutationResult> => {
  const parsed = cartProductIdSchema.safeParse(productId)

  if (!parsed.success) {
    return { success: false, error: 'Товар не найден' }
  }

  try {
    const owner = await resolveCartOwner({ clearMergedCookie: true })

    if (!owner.key) {
      return { success: true, quantity: 0, count: 0 }
    }

    const key = owner.key
    await redis.hdel(key, String(parsed.data))

    const count = await redis.hlen(key)

    if (count > 0) {
      const ttl =
        owner.type === 'user' ? CART_USER_TTL_SECONDS : CART_TTL_SECONDS

      await redis.expire(key, ttl)
    }

    return { success: true, quantity: 0, count }
  } catch (error) {
    console.error(`Ошибка удаления товара ${productId} из корзины`, error)
    return { success: false, error: 'Не удалось удалить товар' }
  }
}
