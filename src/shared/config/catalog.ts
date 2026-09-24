export const DEFAULT_CATALOG_TITLE = 'Все продукты'
export const NEW_CATEGORY_TITLE = 'Новинки'

type CatalogBase = 'plombir' | 'slivochnoe' | 'sorbet'

export const CATEGORY_LABELS: Record<CatalogBase, string> = {
  plombir: 'Пломбир',
  slivochnoe: 'Сливочное мороженное',
  sorbet: 'Сорбеты',
}

export type CatalogCategory = { title: string; href: string; isNew?: boolean }

export const CATALOG_CATEGORIES: readonly CatalogCategory[] = [
  { title: NEW_CATEGORY_TITLE, href: '/products?isNew=1', isNew: true },
  { title: CATEGORY_LABELS.plombir, href: '/products?base=plombir' },
  { title: CATEGORY_LABELS.slivochnoe, href: '/products?base=slivochnoe' },
  { title: CATEGORY_LABELS.sorbet, href: '/products?base=sorbet' },
]

export const getCatalogTitle = (base?: CatalogBase): string =>
  base ? CATEGORY_LABELS[base] : DEFAULT_CATALOG_TITLE