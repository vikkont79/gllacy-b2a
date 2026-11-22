'use server'

import { redis } from '@/shared/lib/redis'

import { cartKey } from '../lib'
import { readGuestId } from './guestId'

type CartCountResult =
  | { success: true; count: number }
  | { success: false }

export const getCartCount = async (): Promise<CartCountResult> => {
  try {
    const guestId = await readGuestId()

    if (!guestId) {
      return { success: true, count: 0 }
    }

    return { success: true, count: await redis.hlen(cartKey(guestId)) }
  } catch (error) {
    console.error('Ошибка чтения счётчика корзины', error)
    return { success: false }
  }
}
