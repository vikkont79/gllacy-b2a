import 'server-only'

import { cache } from 'react'
import { count } from 'drizzle-orm'

import { db } from '@db/client'
import { productToppings } from '@db/schema'

export const getToppingUsage = cache(async (): Promise<Record<number, number>> => {
  try {
    const rows = await db
      .select({
        toppingId: productToppings.toppingId,
        productCount: count(),
      })
      .from(productToppings)
      .groupBy(productToppings.toppingId)

    const usage: Record<number, number> = {}

    for (const row of rows) {
      usage[row.toppingId] = Number(row.productCount)
    }

    return usage
  } catch (error) {
    console.error('Ошибка загрузки использования наполнителей', error)
    throw new Error('Ошибка загрузки использования наполнителей')
  }
})
