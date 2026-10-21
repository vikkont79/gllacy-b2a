import 'server-only'

import { cache } from 'react'
import { eq, getTableColumns } from 'drizzle-orm'

import { db } from '@db/client'
import { productToppings, products } from '@db/schema'
import type { AdminProductDetails } from '../types'

/*
 * Товар для формы редактирования. Поиск по id: форма живёт на
 * /admin/products/[id]. Возвращаем все поля строки и id привязанных
 * наполнителей — и маркеров, и именованных. Разделять их будет форма
 * через isMarkerTopping, каталог у неё уже есть.
 */
export const getProductById = cache(
  async (id: number): Promise<AdminProductDetails | null> => {
    try {
      const [row] = await db
        .select({ ...getTableColumns(products) })
        .from(products)
        .where(eq(products.id, id))
        .limit(1)

      if (!row) return null

      const links = await db
        .select({ toppingId: productToppings.toppingId })
        .from(productToppings)
        .where(eq(productToppings.productId, id))

      return {
        ...row,
        toppingIds: links.map(({ toppingId }) => toppingId),
      }
    } catch (error) {
      console.error(`Ошибка загрузки товара с id ${id}`, error)
      throw new Error('Ошибка загрузки товара')
    }
  },
)
