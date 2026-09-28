import type { GetProductsOptions } from '@/entities/product/types'
import { getCatalogTitle } from '@/shared/config/catalog'
import { createCatalogUrl } from './createCatalogUrl'

export type Crumb = {
  name: string
  url: string
}

export const createBreadcrumbs = (options: GetProductsOptions): Crumb[] => [
  { name: 'Главная', url: '/' },
  { name: 'Каталог', url: '/products' },
  {
    name: getCatalogTitle(options),
    url: createCatalogUrl({ base: options.base, isNew: options.isNew }),
  },
]