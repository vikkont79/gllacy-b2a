import 'server-only'

import { cookies } from 'next/headers'

import { env } from '@/shared/lib/env'

import { CART_COOKIE_NAME, CART_TTL_SECONDS } from '../lib'

const hasValue = (value: string | undefined): value is string =>
  typeof value === 'string' && value.length > 0

/** Читает id гостя. На чтении корзины новый id не создаём. */
export const readGuestId = async (): Promise<string | null> => {
  const store = await cookies()
  const value = store.get(CART_COOKIE_NAME)?.value

  return hasValue(value) ? value : null
}

/**
 * Возвращает id гостя, создавая cookie при первом добавлении.
 * Вызывать только из Server Action: set в Server Component запрещён.
 */
export const ensureGuestId = async (): Promise<string> => {
  const existing = await readGuestId()

  if (existing) return existing

  const guestId = crypto.randomUUID()
  const store = await cookies()

  store.set(CART_COOKIE_NAME, guestId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    path: '/',
    maxAge: CART_TTL_SECONDS,
  })

  return guestId
}
