import { describe, expect, it } from 'vitest'

import { createCatalogUrl } from './createCatalogUrl'

describe('createCatalogUrl', () => {
  it('без параметров возвращает чистый /products', () => {
    expect(createCatalogUrl({})).toBe('/products')
  })

  it('собирает параметры в URL', () => {
    expect(createCatalogUrl({ sort: 'cheap', page: 2, limit: 6 })).toBe(
      '/products?sort=cheap&page=2&limit=6',
    )
  })

  it('сериализует «популярный» сорт в URL', () => {
    expect(createCatalogUrl({ sort: 'popular' })).toBe('/products?sort=popular')
  })

  it('пропускает незаданные параметры', () => {
    expect(createCatalogUrl({ page: 1 })).toBe('/products?page=1')
  })

  it('эмитит base и isNew', () => {
    expect(createCatalogUrl({ base: 'plombir', isNew: true })).toBe(
      '/products?base=plombir&isNew=1',
    )
  })

  it('сериализует kinds повторяющимся параметром', () => {
    expect(createCatalogUrl({ toppings: ['chunk', 'syrup'] })).toBe(
      '/products?toppings=chunk&toppings=syrup',
    )
  })
})