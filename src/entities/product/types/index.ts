import type { ProductRow } from '@db/schema'

export type Product = ProductRow & {
  flavour: string
  toppings: string[]
}

export type Sort = 'cheap' | 'expensive'

export type Base = ProductRow['base']

export type GetProductsOptions = {
  sort?: Sort
  page?: number
  limit?: number
  base?: Base
  isNew?: boolean
}

export type ProductsResult = {
  items: Product[]
  total: number
}