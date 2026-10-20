'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@db/client'
import { products } from '@db/schema'
import { getAdminSession } from '@/shared/lib/requireAdmin'

import { productPriceSchema } from '../types'

export type UpdateProductPriceResult =
  | { success: true; price: number }
  | { success: false; error: string }

export const updateProductPrice = async (
  productId: number,
  price: number | string,
): Promise<UpdateProductPriceResult> => {
  const session = await getAdminSession()

  if (!session) {
    return { success: false, error: 'Сессия истекла. Войдите заново.' }
  }

  if (!Number.isInteger(productId) || productId <= 0) {
    return { success: false, error: 'Товар не найден' }
  }

  const normalized = typeof price === 'string' ? price.replace(',', '.') : price
  const parsed = productPriceSchema.safeParse({ price: normalized })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Проверьте цену',
    }
  }

  const kopecks = Math.round(parsed.data.price * 100)

  try {
    const [updated] = await db
      .update(products)
      .set({ price: kopecks, updatedAt: new Date() })
      .where(eq(products.id, productId))
      .returning({ slug: products.slug })

    if (!updated) {
      return { success: false, error: 'Товар не найден' }
    }

    revalidatePath('/admin')
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath(`/products/${updated.slug}`)

    return { success: true, price: kopecks }
  } catch (error) {
    console.error(`Ошибка обновления цены товара ${productId}`, error)
    return { success: false, error: 'Не удалось сохранить цену' }
  }
}
