'use server'

import { redis } from '@/shared/lib/redis'

import { resolveCartOwner } from './cartOwner'

type SyncCartResult =
  | { success: true; count: number }
  | { success: false }

/*
 * Не просто «сколько в корзине», а синхронизация владельца: при первом заходе
 * после входа сливает гостевую корзину в аккаунтную и стирает cookie гостя.
 * Поэтому это Server Action (cookie), а не чтение в рендере. Вызывается из
 * счётчика в шапке, то есть на каждой странице.
 */
export const syncCart = async (): Promise<SyncCartResult> => {
  try {
    const owner = await resolveCartOwner({ clearMergedCookie: true })

    if (!owner.key) return { success: true, count: 0 }

    return { success: true, count: await redis.hlen(owner.key) }
  } catch (error) {
    console.error('Ошибка синхронизации корзины', error)
    return { success: false }
  }
}
