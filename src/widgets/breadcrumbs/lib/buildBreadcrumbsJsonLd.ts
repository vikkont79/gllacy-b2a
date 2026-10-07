import { SITE_URL } from '@/shared/config'
import type { Crumb } from '../types'

/*
 * Разметка крошек. Живёт рядом с крошками, потому что потребитель у этого
 * билдера ровно один — виджет крошек, и склеивать относительные адреса с
 * доменом больше некому.
 *
 * Отдельная функция, а не часть buildBreadcrumbListJsonLd: билдер в
 * shared/config остаётся чистым, не знает про SITE_URL и принимает готовые
 * адреса как есть.
 */
export const buildBreadcrumbsJsonLd = (crumbs: readonly Crumb[]) => {
  const lastIndex = crumbs.length - 1

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(index === lastIndex ? {} : { item: `${SITE_URL}${crumb.url}` }),
    })),
  }
}