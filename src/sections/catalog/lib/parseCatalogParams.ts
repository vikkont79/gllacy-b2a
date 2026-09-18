import type { Base, GetProductsOptions, Sort } from '@/entities/product/types'

type RawSearchParams = Record<string, string | string[] | undefined>

const SORTS: readonly Sort[] = ['cheap', 'expensive']
const BASES: readonly Base[] = ['plombir', 'slivochnoe', 'sorbet']

export const parseCatalogParams = (params: RawSearchParams): GetProductsOptions => {
  const options: GetProductsOptions = {}

  const { sort, page, limit, base, isNew } = params

  if (typeof sort === 'string' && (SORTS as readonly string[]).includes(sort)) {
    options.sort = sort as Sort
  }

  if (typeof page === 'string' && /^\d+$/.test(page)) {
    options.page = Number(page)
  }

  if (typeof limit === 'string' && /^\d+$/.test(limit)) {
    options.limit = Number(limit)
  }

  if (typeof base === 'string' && (BASES as readonly string[]).includes(base)) {
    options.base = base as Base
  }

  if (isNew === '1') {
    options.isNew = true
  }

  return options
}
