import { describe, expect, it } from 'vitest'
import { SITE_URL } from '@/shared/config'
import { buildBreadcrumbsJsonLd } from './buildBreadcrumbsJsonLd'

const crumbs = [
  { name: 'Главная', url: '/' },
  { name: 'Каталог', url: '/products' },
  { name: 'Пломбир', url: '/products?base=plombir' },
] as const

describe('buildBreadcrumbsJsonLd', () => {
  it('BreadcrumbList с контекстом', () => {
    const jsonLd = buildBreadcrumbsJsonLd(crumbs)

    expect(jsonLd['@context']).toBe('https://schema.org')
    expect(jsonLd['@type']).toBe('BreadcrumbList')
  })

  it('позиции по порядку, последнее звено без item', () => {
    const jsonLd = buildBreadcrumbsJsonLd(crumbs)

    expect(jsonLd.itemListElement).toHaveLength(3)
    expect(jsonLd.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: `${SITE_URL}/`,
    })
    expect(jsonLd.itemListElement[2]).toEqual({
      '@type': 'ListItem',
      position: 3,
      name: 'Пломбир',
    })
  })

  it('адреса склеиваются с доменом, без двойного слэша', () => {
    const jsonLd = buildBreadcrumbsJsonLd(crumbs)

    expect(jsonLd.itemListElement[1].item).toBe(`${SITE_URL}/products`)
    expect(JSON.stringify(jsonLd)).not.toContain('//products')
  })

  it('единственное звено не несёт item', () => {
    const jsonLd = buildBreadcrumbsJsonLd([{ name: 'Главная', url: '/' }])

    expect(jsonLd.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
    })
  })

  it('пустая цепочка даёт пустой список', () => {
    const jsonLd = buildBreadcrumbsJsonLd([])

    expect(jsonLd.itemListElement).toEqual([])
  })
})