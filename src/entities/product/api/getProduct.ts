import 'server-only'

import { cache } from 'react'
import { and, eq, getTableColumns } from 'drizzle-orm'

import { db } from '@db/client'
import { flavours, productToppings, products, toppings } from '@db/schema'
import type { Product } from '../types'

export const getProduct = cache(
  async (slug: string): Promise<Product | null> => {
    try {
      const [row] = await db
        .select({ ...getTableColumns(products), flavour: flavours.name })
        .from(products)
        .innerJoin(flavours, eq(products.flavourId, flavours.id))
        .where(and(eq(products.slug, slug), eq(products.isAvailable, true)))
        .limit(1)

      if (!row) return null

      const toppingRows = await db
        .select({ name: toppings.name, kind: toppings.kind })
        .from(productToppings)
        .innerJoin(toppings, eq(productToppings.toppingId, toppings.id))
        .where(eq(productToppings.productId, row.id))

      return { ...row, toppings: toppingRows }
    } catch (error) {
      console.error(`Ошибка загрузки товара «${slug}»`, error)
      throw new Error('Ошибка загрузки товара')
    }
  },
)