import type { Base } from '../types'

export const DEFAULT_CATALOG_TITLE = 'Все продукты'

export const NEW_CATEGORY_TITLE = 'Новинки'

export const CATEGORY_LABELS: Record<Base, string> = {
  plombir: 'Пломбир',
  slivochnoe: 'Сливочное',
  sorbet: 'Сорбеты',
}

export type CatalogCategory = { title: string; href: string; isNew?: boolean }

export const CATALOG_CATEGORIES: readonly CatalogCategory[] = [
  { title: NEW_CATEGORY_TITLE, href: '/products?isNew=1', isNew: true },
  { title: CATEGORY_LABELS.plombir, href: '/products?base=plombir' },
  { title: CATEGORY_LABELS.slivochnoe, href: '/products?base=slivochnoe' },
  { title: CATEGORY_LABELS.sorbet, href: '/products?base=sorbet' },
]

export type CatalogTitleOptions = {
  base?: Base
  isNew?: boolean
}

export const getCatalogTitle = ({ base, isNew }: CatalogTitleOptions = {}): string => {
  if (isNew) return NEW_CATEGORY_TITLE
  return base ? CATEGORY_LABELS[base] : DEFAULT_CATALOG_TITLE
}