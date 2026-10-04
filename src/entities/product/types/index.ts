import type { ProductRow } from '@db/schema'

export type ToppingKind = 'chunk' | 'jam' | 'syrup' | 'sprinkle'

export type ProductTopping = {
  name: string
  kind: ToppingKind
}

export type Product = ProductRow & {
  flavour: string
  toppings: ProductTopping[]
}

export type Sort = 'popular' | 'cheap' | 'expensive'

export type Base = ProductRow['base']

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