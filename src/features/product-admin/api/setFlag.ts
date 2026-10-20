import 'server-only'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@db/client'
import { products } from '@db/schema'
import { getAdminSession } from '@/shared/lib/requireAdmin'

type ProductFlag = 'isAvailable' | 'isNew'

export type SetFlagResult =
  | { success: true }
  | { success: false; error: string }

export const setFlag = async (
  productId: number,
  flag: ProductFlag,
  value: boolean,
): Promise<SetFlagResult> => {
  const session = await getAdminSession()

  if (!session) {
    return { success: false, error: 'Сессия истекла. Войдите заново.' }
  }

  if (!Number.isInteger(productId) || productId <= 0) {
    return { success: false, error: 'Товар не найден' }
  }

  const patch = flag === 'isAvailable' ? { isAvailable: value } : { isNew: value }

  try {
    const [updated] = await db
      .update(products)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(products.id, productId))
      .returning({ slug: products.slug })

    if (!updated) {
      return { success: false, error: 'Товар не найден' }
    }

    revalidatePath('/admin')
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath(`/products/${updated.slug}`)

    return { success: true }
  } catch (error) {
    console.error(`Ошибка смены флага ${flag} у товара ${productId}`, error)
    return { success: false, error: 'Не удалось изменить товар' }
  }
}
