import { createCatalogUrl, getCatalogTitle } from '@/entities/product/lib'
import type { GetProductsOptions } from '@/entities/product/types'
import type { Crumb } from '@/widgets/breadcrumbs'

export const createBreadcrumbs = (options: GetProductsOptions): Crumb[] => [
  { name: 'Главная', url: '/' },
  { name: 'Каталог', url: '/products' },
  {
    name: getCatalogTitle(options),
    url: createCatalogUrl({ base: options.base, isNew: options.isNew }),
  },
]