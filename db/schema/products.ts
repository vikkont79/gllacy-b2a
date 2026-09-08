import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const flavours = sqliteTable('flavours', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
})

export const toppings = sqliteTable('toppings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  kind: text('kind', { enum: ['chunk', 'topping', 'syrup', 'sprinkle'] }).notNull(),
})

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  base: text('base', { enum: ['plombir', 'slivochnoe', 'sorbet'] }).notNull(),
  flavourId: integer('flavourId').references(() => flavours.id),
  price: integer('price').notNull(),
  calories: integer('calories').notNull(),
  shelfLife: integer('shelfLife').notNull(),
  image: text('image').notNull(),
  description: text('description').notNull(),
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