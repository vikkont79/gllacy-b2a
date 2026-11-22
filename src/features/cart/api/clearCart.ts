'use server'

import { redis } from '@/shared/lib/redis'

import { cartKey } from '../lib'
import type { CartMutationResult } from '../types'
import { readGuestId } from './guestId'

export const clearCart = async (): Promise<CartMutationResult> => {
  try {
    const guestId = await readGuestId()

    if (guestId) {
      await redis.del(cartKey(guestId))
    }

    return { success: true, quantity: 0, count: 0 }
  } catch (error) {
    console.error('Ошибка очистки корзины', error)
    return { success: false, error: 'Не удалось очистить корзину' }
  }
}
