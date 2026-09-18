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

  it('читает base категории', () => {
    expect(parseCatalogParams({ base: 'sorbet' })).toEqual({ base: 'sorbet' })
  })

  it('игнорирует неизвестный base', () => {
    expect(parseCatalogParams({ base: 'newbase' })).toEqual({})
  })

  it('читает isNew из "1"', () => {
    expect(parseCatalogParams({ isNew: '1' })).toEqual({ isNew: true })
  })

  it('игнорирует неединичный isNew', () => {
    expect(parseCatalogParams({ isNew: '0' })).toEqual({})
    expect(parseCatalogParams({ isNew: 'abc' })).toEqual({})
  })
})