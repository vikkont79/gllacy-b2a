import 'server-only'

import { headers } from 'next/headers'

import { auth } from '@/shared/lib/auth'

import { guestCartKey, userCartKey } from '../lib'
import { clearGuestId, ensureGuestId, readGuestId } from './guestId'
import { mergeGuestCart } from './mergeGuestCart'

export type CartOwner =
  | { type: 'user'; key: string }
  | { type: 'guest'; key: string | null }

interface ResolveCartOwnerOptions {
  /** Создать гостевую cookie, если её ещё нет (только для добавления). */
  createGuest?: boolean
  /** Стереть cookie гостя после мерджа (только из Server Action). */
  clearMergedCookie?: boolean
}

const getSession = async () => auth.api.getSession({ headers: await headers() })

/*
 * Владелец корзины. userId берём только из сессии, guestId — только из cookie:
 * клиент ничего не присылает, поэтому подменить владельца нельзя.
 *
 * Мердж гостевой корзины в аккаунтную делаем здесь же, при первом обращении
 * после входа. Скрипт идемпотентен, поэтому повторные вызовы безопасны.
 *
 * Ошибку проверки сессии пробрасываем: тихий откат в гостя показал бы
 * вошедшему пустую корзину и писал бы изменения не туда.
 */
export const resolveCartOwner = async ({
  createGuest = false,
  clearMergedCookie = false,
}: ResolveCartOwnerOptions = {}): Promise<CartOwner> => {
  const session = await getSession()

  if (session) {
    const guestId = await readGuestId()

    if (guestId) {
      await mergeGuestCart(guestId, session.user.id)

      if (clearMergedCookie) await clearGuestId()
    }

    return { type: 'user', key: userCartKey(session.user.id) }
  }

  if (createGuest) {
    return { type: 'guest', key: guestCartKey(await ensureGuestId()) }
  }

  const guestId = await readGuestId()

  return { type: 'guest', key: guestId ? guestCartKey(guestId) : null }
}
