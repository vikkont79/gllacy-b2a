import 'server-only'

import { eq } from 'drizzle-orm'

import { db } from '@db/client'
import { products } from '@db/schema'

/*
 * null — товара нет, true/false — есть и доступен/недоступен.
 * Нужен и при добавлении, и при изменении количества.
 */
export const getProductAvailability = async (
  productId: number,
): Promise<boolean | null> => {
  const [product] = await db
    .select({ isAvailable: products.isAvailable })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1)

  return product ? product.isAvailable : null
}
