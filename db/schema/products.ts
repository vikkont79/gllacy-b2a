import { integer, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

import type { Base, ProductRow, ToppingKind } from '@/entities/product/types'

export const flavours = sqliteTable('flavours', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
})

export const toppings = sqliteTable('toppings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  kind: text('kind').$type<ToppingKind>().notNull(),
})

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  base: text('base').$type<Base>().notNull(),
  flavourId: integer('flavourId').notNull().references(() => flavours.id),
  price: integer('price').notNull(),
  calories: integer('calories').notNull(),
  protein: real('protein').notNull(),
  fat: real('fat').notNull(),
  carbs: real('carbs').notNull(),
  shelfLife: integer('shelfLife').notNull(),
  image: text('image').notNull(),
  description: text('description').notNull(),
  composition: text('composition').notNull(),
  isAvailable: integer('isAvailable', { mode: 'boolean' }).notNull().default(true),
  isNew: integer('isNew', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const productToppings = sqliteTable(
  'product_toppings',
  {
    productId: integer('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    toppingId: integer('toppingId')
      .notNull()
      .references(() => toppings.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.productId, table.toppingId] })],
)

/*
 * Рукиописный ProductRow живёт в entities/product/types, чтобы слой сущности не
 * зависел от инфраструктуры. Проверка ниже не даёт ему разойтись с таблицей:
 * если колонку добавят, удалят или поменяют тип, tsc упадёт здесь.
 */
type AssertAssignable<T extends U, U> = T
export type ProductRowMatchesSchema = AssertAssignable<typeof products.$inferSelect, ProductRow>