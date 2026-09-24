import type { GetProductsOptions } from '@/entities/product/types'

export const createCatalogUrl = (params: GetProductsOptions): string => {
  const search = new URLSearchParams()

  if (params.sort) search.set('sort', params.sort)
  if (params.page) search.set('page', String(params.page))
  if (params.limit) search.set('limit', String(params.limit))
  if (params.base) search.set('base', params.base)
  if (params.isNew) search.set('isNew', '1')
  if (params.minPrice != null) search.set('minPrice', String(params.minPrice))
  if (params.maxPrice != null) search.set('maxPrice', String(params.maxPrice))
  for (const kind of params.toppings ?? []) search.append('toppings', kind)

  const query = search.toString()
  return query ? `/products?${query}` : '/products'
}