import type { ProductRow } from '@db/schema'

export type Product = ProductRow & {
  flavour: string
  toppings: string[]
}

export type Sort = 'popular' | 'cheap' | 'expensive'

export type Base = ProductRow['base']

export type ToppingKind = 'chunk' | 'topping' | 'syrup' | 'sprinkle'

export type GetProductsOptions = {
  sort?: Sort
  page?: number
  limit?: number
  base?: Base
  isNew?: boolean
  toppings?: ToppingKind[]
  minPrice?: number
  maxPrice?: number
}

export type ProductsResult = {
  items: ProductRow[]
  total: number
}

export type PriceBounds = {
  minPrice: number
  maxPrice: number
}