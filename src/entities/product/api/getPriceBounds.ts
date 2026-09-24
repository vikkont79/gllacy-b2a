import 'server-only'

import { cache } from 'react'
import { and, eq, max, min } from 'drizzle-orm'

import { db } from '@db/client'
import { products } from '@db/schema'
import type { GetProductsOptions, PriceBounds } from '../types'

type GetPriceBoundsOptions = Pick<GetProductsOptions, 'base'>

export const getPriceBounds = cache(
  async (options: GetPriceBoundsOptions = {}): Promise<PriceBounds | null> => {
    const { base } = options
    const filters = [
      eq(products.isAvailable, true),
      ...(base ? [eq(products.base, base)] : []),
    ]

    try {
      const [row] = await db
        .select({
          minPrice: min(products.price),
          maxPrice: max(products.price),
        })
        .from(products)
        .where(and(...filters))

      if (!row || row.minPrice == null || row.maxPrice == null) return null

      return { minPrice: row.minPrice, maxPrice: row.maxPrice }
    } catch (error) {
      console.error('Ошибка загрузки диапазона цен', error)
      throw new Error('Ошибка загрузки диапазона цен')
    }
  },
)