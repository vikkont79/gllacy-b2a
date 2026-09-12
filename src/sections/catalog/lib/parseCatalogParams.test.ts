import { describe, expect, it } from 'vitest'

import { parseCatalogParams } from './parseCatalogParams'

describe('parseCatalogParams', () => {
  it('без параметров возвращает пустые опции', () => {
    expect(parseCatalogParams({})).toEqual({})
  })

  it('читает валидную сортировку', () => {
    expect(parseCatalogParams({ sort: 'cheap' })).toEqual({ sort: 'cheap' })
  })

  it('игнорирует «популярный» и неизвестный сорт', () => {
    expect(parseCatalogParams({ sort: 'popular' })).toEqual({})
    expect(parseCatalogParams({ sort: 'abc' })).toEqual({})
  })

  it('читает page и limit из цифр', () => {
    expect(parseCatalogParams({ page: '2', limit: '6' })).toEqual({ page: 2, limit: 6 })
  })

  it('игнорирует нецифровые page и limit', () => {
    expect(parseCatalogParams({ page: 'abc', limit: '-1' })).toEqual({})
  })
})