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

  it('пропускает незаданные параметры', () => {
    expect(createCatalogUrl({ page: 1 })).toBe('/products?page=1')
  })
})