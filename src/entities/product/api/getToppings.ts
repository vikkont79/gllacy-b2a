import 'server-only'

import { cache } from 'react'
import { asc } from 'drizzle-orm'

import { db } from '@db/client'
import { toppings } from '@db/schema'
import type { ProductTopping } from '../types'

/*
 * Весь справочник наполнителей: и маркеры категорий, и именованные.
 * Форме нужны все строки — по ним рисуются чекбоксы, а isMarkerTopping
 * на месте решает, как подписать строку и как обработать клик.
 */
export const getToppings = cache(async (): Promise<ProductTopping[]> => {
  try {
    return await db
      .select({
        id: toppings.id,
        name: toppings.name,
        kind: toppings.kind,
      })
      .from(toppings)
      .orderBy(asc(toppings.id))
  } catch (error) {
    console.error('Ошибка загрузки наполнителей', error)
    throw new Error('Ошибка загрузки наполнителей')
  }
})
