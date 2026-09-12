import type { GetProductsOptions, Sort } from '@/entities/product/types'

type RawSearchParams = Record<string, string | string[] | undefined>

const SORTS: readonly Sort[] = ['cheap', 'expensive']

export const parseCatalogParams = (params: RawSearchParams): GetProductsOptions => {
  const options: GetProductsOptions = {}

  const { sort, page, limit } = params

  if (typeof sort === 'string' && (SORTS as readonly string[]).includes(sort)) {
    options.sort = sort as Sort
  }

  if (typeof page === 'string' && /^\d+$/.test(page)) {
    options.page = Number(page)
  }

  if (typeof limit === 'string' && /^\d+$/.test(limit)) {
    options.limit = Number(limit)
  }

  return options
}