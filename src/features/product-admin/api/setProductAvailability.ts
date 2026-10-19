'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@db/client'
import { products } from '@db/schema'
import { getAdminSession } from '@/shared/lib/requireAdmin'

export type SetProductAvailabilityResult =
  | { ok: true }
  | { ok: false; error: string }

export const setProductAvailability = async (
  productId: number,
  isAvailable: boolean,
): Promise<SetProductAvailabilityResult> => {
  const session = await getAdminSession()

  if (!session) {
    return { ok: false, error: 'Сессия истекла. Войдите заново.' }
  }

  if (!Number.isInteger(productId) || productId <= 0) {
    return { ok: false, error: 'Товар не найден' }
  }

  try {
    const [updated] = await db
      .update(products)
      .set({ isAvailable, updatedAt: new Date() })
      .where(eq(products.id, productId))
      .returning({ id: products.id, slug: products.slug })

    if (!updated) {
      return { ok: false, error: 'Товар не найден' }
    }

    revalidatePath('/admin')
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath(`/products/${updated.slug}`)

    return { ok: true }
  } catch (error) {
    console.error(`Ошибка смены доступности товара ${productId}`, error)
    return { ok: false, error: 'Не удалось изменить доступность' }
  }
}
