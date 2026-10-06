import type { BASE_VALUES, TOPPING_KIND_VALUES } from '@/shared/config/product'

export type Base = (typeof BASE_VALUES)[number]

export type ToppingKind = (typeof TOPPING_KIND_VALUES)[number]

export type ProductRow = {
  id: number
  slug: string
  name: string
  base: Base
  flavourId: number
  price: number
  calories: number
  shelfLife: number
  image: string
  description: string
  isAvailable: boolean
  isNew: boolean
  createdAt: Date
  updatedAt: Date
}

export type ProductTopping = {
  name: string
  kind: ToppingKind
}

export type Product = ProductRow & {
  flavour: string
  toppings: ProductTopping[]
}

export type Sort = 'popular' | 'cheap' | 'expensive'

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