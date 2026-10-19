import 'server-only'

import { cache } from 'react'
import { asc } from 'drizzle-orm'

import { db } from '@db/client'
import { flavours } from '@db/schema'
import type { FlavourOption } from '../types'

/*
 * Справочник вкусов для Select в форме товара. Сортировка по id:
 * стабильна и не зависит от русской коллации SQLite. Сейчас строка
 * одна — «есть: вкус», — но форма уже готова к нескольким.
 */
export const getFlavours = cache(async (): Promise<FlavourOption[]> => {
  try {
    return await db
      .select({
        id: flavours.id,
        name: flavours.name,
      })
      .from(flavours)
      .orderBy(asc(flavours.id))
  } catch (error) {
    console.error('Ошибка загрузки вкусов', error)
    throw new Error('Ошибка загрузки вкусов')
  }
})
