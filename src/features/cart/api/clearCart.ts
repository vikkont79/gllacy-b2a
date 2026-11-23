'use server'

import { redis } from '@/shared/lib/redis'

import type { CartMutationResult } from '../types'
import { resolveCartOwner } from './cartOwner'

export const clearCart = async (): Promise<CartMutationResult> => {
  try {
    const owner = await resolveCartOwner({ clearMergedCookie: true })

    if (owner.key) {
      await redis.del(owner.key)
    }

    return { success: true, quantity: 0, count: 0 }
  } catch (error) {
    console.error('Ошибка очистки корзины', error)
    return { success: false, error: 'Не удалось очистить корзину' }
  }
}
