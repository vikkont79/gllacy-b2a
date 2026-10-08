import type { MetadataRoute } from 'next'

import { getProductSlugs } from '@/entities/product/api/getProductSlugs'
import { createCatalogUrl } from '@/entities/product/lib'
import { BASE_VALUES, SITE_URL } from '@/shared/config'

/*
 * Карта сайта для краулеров и агентов.
 *
 * Кешируется Next по умолчанию, поэтому revalidate выставлен явно: без него
 * новый товар попал бы в карту только после редеплоя. Интервал тот же, что
 * на главной.
 *
 * Разделы каталога идут разделами, а не фильтрами: /products?base=plombir —
 * пункт меню из CATALOG_CATEGORIES со своим заголовком, такая страница
 * самостоятельна. Сортировка, постраничность и диапазон цен в карту не идут:
 * это состояния одной страницы, а не документы.
 */
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productSlugs = await getProductSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'daily', priority: 0.9 },
    {
      url: `${SITE_URL}${createCatalogUrl({ isNew: true })}`,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...BASE_VALUES.map((base) => ({
      url: `${SITE_URL}${createCatalogUrl({ base })}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}