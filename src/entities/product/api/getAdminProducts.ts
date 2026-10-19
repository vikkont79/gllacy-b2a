import 'server-only'

import { cache } from 'react'
import { asc } from 'drizzle-orm'

import { db } from '@db/client'
import { products } from '@db/schema'
import type { AdminProductRow } from '../types'

/*
 * Список для /admin: все товары, включая скрытые. Отличается от
 * getProducts, который фильтрует по isAvailable и считает total.
 * Цена тянется как ключевая метрика карточки; base/КБЖУ не нужны.
 */
export const getAdminProducts = cache(async (): Promise<AdminProductRow[]> => {
  try {
    return await db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        price: products.price,
        image: products.image,
        isAvailable: products.isAvailable,
      })
      .from(products)
      .orderBy(asc(products.id))
  } catch (error) {
    console.error('Ошибка загрузки товаров для админки', error)
    throw new Error('Ошибка загрузки товаров для админки')
  }
})
