import type { Product } from '@/entities/product'
import { CATEGORY_LABELS, createCatalogUrl } from '@/entities/product/lib'
import type { Crumb } from '@/widgets/breadcrumbs'

/*
 * Цепочка крошек товара. Раздел берётся из base: /products?base=plombir — не
 * состояние фильтра, а пункт меню из CATALOG_CATEGORIES, у него свой заголовок
 * и своя выдача, поэтому это самостоятельная страница.
 *
 * Последнее звено собирается здесь, а не из URL: slug дал бы транслит
 * «fistashka» вместо «Фисташка».
 */
export const createProductCrumbs = (product: Product): Crumb[] => [
  { name: 'Главная', url: '/' },
  { name: 'Каталог', url: '/products' },
  {
    name: CATEGORY_LABELS[product.base],
    url: createCatalogUrl({ base: product.base }),
  },
  { name: product.name, url: `/products/${product.slug}` },
]