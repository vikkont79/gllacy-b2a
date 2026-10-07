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

  it('пишет minPrice и maxPrice', () => {
    expect(createCatalogUrl({ minPrice: 150, maxPrice: 400 })).toBe(
      '/products?minPrice=150&maxPrice=400',
    )
  })

  it('поддерживает односторонний фильтр цены', () => {
    expect(createCatalogUrl({ minPrice: 50 })).toBe('/products?minPrice=50')
    expect(createCatalogUrl({ maxPrice: 250 })).toBe('/products?maxPrice=250')
  })

  it('сериализует нулевую цену', () => {
    expect(createCatalogUrl({ minPrice: 0 })).toBe('/products?minPrice=0')
  })

  it('пропускает незаданную цену', () => {
    expect(createCatalogUrl({ sort: 'cheap' })).not.toContain('minPrice')
    expect(createCatalogUrl({ sort: 'cheap' })).not.toContain('maxPrice')
  })

  it('сохраняет порядок при комбинации с другими параметрами', () => {
    expect(createCatalogUrl({ base: 'sorbet', minPrice: 100, maxPrice: 200 })).toBe(
      '/products?base=sorbet&minPrice=100&maxPrice=200',
    )
  })
})