import type { Base, GetProductsOptions, Sort, ToppingKind } from '@/entities/product/types'

type RawSearchParams = Record<string, string | string[] | undefined>

const SORTS: readonly Sort[] = ['popular', 'cheap', 'expensive']
const BASES: readonly Base[] = ['plombir', 'slivochnoe', 'sorbet']
const TOPPING_KINDS: readonly ToppingKind[] = ['chunk', 'topping', 'syrup', 'sprinkle']

export const parseCatalogParams = (params: RawSearchParams): GetProductsOptions => {
  const options: GetProductsOptions = {}

  const { sort, page, limit, base, isNew, toppings } = params

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

  const toppingsList = Array.isArray(toppings)
    ? toppings
    : typeof toppings === 'string'
      ? [toppings]
      : []

  if (toppingsList.length > 0) {
    const validToppings = toppingsList.filter(
      (value): value is ToppingKind =>
        typeof value === 'string' && (TOPPING_KINDS as readonly string[]).includes(value),
    )
    if (validToppings.length > 0) options.toppings = validToppings
  }

  return options
}
