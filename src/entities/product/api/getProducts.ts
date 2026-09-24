import 'server-only'

import { cache } from 'react'
import { and, asc, desc, eq, getTableColumns, gte, lte, sql } from 'drizzle-orm'

import { db } from '@db/client'
import { productToppings, products, toppings } from '@db/schema'
import { ITEMS_PER_PAGE } from '@/shared/config'
import type { GetProductsOptions, ProductsResult, Sort } from '../types'

const ORDER_BY: Record<Sort, ReturnType<typeof asc>[]> = {
  popular: [asc(products.id)],
  cheap: [asc(products.price), asc(products.id)],
  expensive: [desc(products.price), asc(products.id)],
}

export const getProducts = cache(
  async (options: GetProductsOptions = {}): Promise<ProductsResult> => {
    const {
      sort,
      base,
      isNew,
      toppings: selectedKinds = [],
      page = 1,
      limit = ITEMS_PER_PAGE,
      minPrice,
      maxPrice,
    } = options
    const offset = (page - 1) * ITEMS_PER_PAGE
    const orderBy = ORDER_BY[sort ?? 'popular']

    const filters = [
      eq(products.isAvailable, true),
      ...(base ? [eq(products.base, base)] : []),
      ...(isNew ? [eq(products.isNew, true)] : []),
      ...(minPrice != null ? [gte(products.price, minPrice)] : []),
      ...(maxPrice != null ? [lte(products.price, maxPrice)] : []),
      ...(selectedKinds.length > 0
        ? [
            sql`EXISTS (
              SELECT 1 FROM ${productToppings} pt
              JOIN ${toppings} t2 ON t2.id = pt.toppingId
              WHERE pt.productId = ${products.id}
                AND t2.kind IN (${sql.join(selectedKinds.map((kind) => sql`${kind}`), sql`, `)})
            )`,
          ]
        : []),
    ]

    try {
      const [rows, total] = await Promise.all([
        db
          .select({ ...getTableColumns(products) })
          .from(products)
          .where(and(...filters))
          .orderBy(...orderBy)
          .limit(limit)
          .offset(offset),
        db.$count(products, and(...filters)),
      ])

      return { items: rows, total }
    } catch (error) {
      console.error('Ошибка загрузки каталога', error)
      throw new Error('Ошибка загрузки каталога')
    }
  },
)