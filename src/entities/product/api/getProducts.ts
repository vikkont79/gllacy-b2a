import 'server-only'

import { cache } from 'react'
import { and, asc, desc, eq, getTableColumns, sql } from 'drizzle-orm'

import { db } from '@db/client'
import { flavours, productToppings, products, toppings } from '@db/schema'
import { ITEMS_PER_PAGE } from '@/shared/config'
import type { GetProductsOptions, ProductsResult, Sort } from '../types'

const ORDER_BY: Record<Sort, ReturnType<typeof asc>[]> = {
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
    } = options
    const offset = (page - 1) * ITEMS_PER_PAGE
    const orderBy = sort ? ORDER_BY[sort] : [asc(products.id)]

    const filters = [
      eq(products.isAvailable, true),
      ...(base ? [eq(products.base, base)] : []),
      ...(isNew ? [eq(products.isNew, true)] : []),
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
          .select({
            ...getTableColumns(products),
            flavour: flavours.name,
            toppings: sql<string | null>`group_concat(${toppings.name}, ', ')`,
          })
          .from(products)
          .innerJoin(flavours, eq(products.flavourId, flavours.id))
          .leftJoin(productToppings, eq(productToppings.productId, products.id))
          .leftJoin(toppings, eq(productToppings.toppingId, toppings.id))
          .where(and(...filters))
          .groupBy(products.id)
          .orderBy(...orderBy)
          .limit(limit)
          .offset(offset),
        db.$count(products, and(...filters)),
      ])

      const items = rows.map((row) => ({
        ...row,
        toppings: (row.toppings ?? '').split(', ').filter((item) => item.length > 0),
      }))

      return { items, total }
    } catch (error) {
      console.error('Ошибка загрузки каталога', error)
      throw new Error('Ошибка загрузки каталога')
    }
  },
)
