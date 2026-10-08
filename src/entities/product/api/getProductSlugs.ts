import 'server-only'

import { asc } from 'drizzle-orm'

import { db } from '@db/client'
import { products } from '@db/schema'

/*
 * Слаги всех товаров с датой последнего изменения — для карты сайта.
 *
 * Отдельная функция вместо getProducts: карте не нужны фильтры, пагинация и
 * полные строки, только slug и updatedAt. Фильтр isAvailable не ставим —
 * недоступный товар остаётся на сайте и отдаёт OutOfStock, прятать его из
 * карты значило бы вернуть ему 404.
 */
export const getProductSlugs = async (): Promise<ReadonlyArray<{ slug: string; updatedAt: Date }>> => {
  try {
    return await db
      .select({ slug: products.slug, updatedAt: products.updatedAt })
      .from(products)
      .orderBy(asc(products.id))
  } catch (error) {
    console.error('Ошибка загрузки слагов для карты сайта', error)
    throw new Error('Ошибка загрузки карты сайта')
  }
}