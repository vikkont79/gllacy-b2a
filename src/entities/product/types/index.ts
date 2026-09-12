import type { ProductRow } from '@db/schema'

export type Product = ProductRow & {
  flavour: string
  toppings: string[]
}