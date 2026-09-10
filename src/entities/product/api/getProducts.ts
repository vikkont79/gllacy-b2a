import 'server-only'

import { cache } from 'react'
import { asc, eq, getTableColumns, sql } from 'drizzle-orm'

import { db } from '@db/client'
import { flavours, productToppings, products, toppings } from '@db/schema'
import type { Product } from '../types'

export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    const rows = await db
      .select({
        ...getTableColumns(products),
        flavour: flavours.name,
        toppings: sql<string | null>`group_concat(${toppings.name}, ', ')`,
      })
      .from(products)
      .innerJoin(flavours, eq(products.flavourId, flavours.id))
      .leftJoin(productToppings, eq(productToppings.productId, products.id))
      .leftJoin(toppings, eq(productToppings.toppingId, toppings.id))
      .where(eq(products.isAvailable, true))
      .groupBy(products.id)
      .orderBy(asc(products.id))

    const items = rows.map((row) => ({
      ...row,
      toppings: (row.toppings ?? '').split(', ').filter((item) => item.length > 0),
    }))

    return items
  } catch (error) {
    console.error('Ошибка загрузки каталога', error)
    throw new Error('Ошибка загрузки каталога')
  }
})