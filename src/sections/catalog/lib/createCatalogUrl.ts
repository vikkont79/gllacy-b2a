import type { GetProductsOptions } from '@/entities/product/types'

export const createCatalogUrl = (params: GetProductsOptions): string => {
  const search = new URLSearchParams()

  if (params.sort) search.set('sort', params.sort)
  if (params.page) search.set('page', String(params.page))
  if (params.limit) search.set('limit', String(params.limit))

  const query = search.toString()
  return query ? `/products?${query}` : '/products'
}