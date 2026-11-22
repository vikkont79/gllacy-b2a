'use server'

import { redis } from '@/shared/lib/redis'

import { cartKey, CART_TTL_SECONDS } from '../lib'
import {
  cartProductIdSchema,
  cartQuantitySchema,
  type CartMutationResult,
} from '../types'
import { getProductAvailability } from './getProductAvailability'
import { readGuestId } from './guestId'

export const setCartQuantity = async (
  productId: number,
  quantity: number,
): Promise<CartMutationResult> => {
  const parsedId = cartProductIdSchema.safeParse(productId)

  if (!parsedId.success) {
    return { success: false, error: 'Товар не найден' }
  }

  const parsedQuantity = cartQuantitySchema.safeParse(quantity)

  if (!parsedQuantity.success) {
    return {
      success: false,
      error: parsedQuantity.error.issues[0]?.message ?? 'Проверьте количество',
    }
  }

  try {
    const availability = await getProductAvailability(parsedId.data)

    if (availability === null) {
      return { success: false, error: 'Товар не найден' }
    }

    if (!availability) {
      return { success: false, error: 'Товар снят с продажи' }
    }

    const guestId = await readGuestId()

    if (!guestId) {
      return { success: false, error: 'Товара нет в корзине' }
    }

    const key = cartKey(guestId)
    const field = String(parsedId.data)
    const existing = await redis.hget(key, field)

    if (existing === null) {
      return { success: false, error: 'Товара нет в корзине' }
    }

    await redis.hset(key, { [field]: parsedQuantity.data })

    const count = await redis.hlen(key)
    await redis.expire(key, CART_TTL_SECONDS)

    return { success: true, quantity: parsedQuantity.data, count }
  } catch (error) {
    console.error(`Ошибка изменения количества товара ${productId}`, error)
    return { success: false, error: 'Не удалось изменить количество' }
  }
}
