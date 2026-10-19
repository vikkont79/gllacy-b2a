import { describe, expect, it } from 'vitest'

import type { ProductTopping } from '@/entities/product/types'

import { resolveToppingIds } from './index'

const catalog: ProductTopping[] = [
  { id: 1, name: 'клубничный джем', kind: 'jam' },
  { id: 2, name: 'джем', kind: 'jam' },
  { id: 3, name: 'кусочки', kind: 'chunk' },
  { id: 4, name: 'орех', kind: 'chunk' },
  { id: 5, name: 'посыпка', kind: 'sprinkle' },
]

const ids = (selected: number[], source: ProductTopping[] = catalog) =>
  new Set(resolveToppingIds(selected, source).toppingIds)

describe('resolveToppingIds', () => {
  it('оставляет выбранный маркер как есть', () => {
    expect(ids([2])).toEqual(new Set([2]))
  })

  it('добавляет маркер вида к именованному наполнителю', () => {
    expect(ids([1])).toEqual(new Set([1, 2]))
    expect(ids([4])).toEqual(new Set([3, 4]))
  })

  it('не дублирует маркер, если он уже выбран', () => {
    expect(ids([1, 2])).toEqual(new Set([1, 2]))
    expect(ids([1, 1, 2])).toEqual(new Set([1, 2]))
  })

  it('игнорирует неизвестные id', () => {
    expect(ids([99])).toEqual(new Set())
    expect(ids([99, 2])).toEqual(new Set([2]))
  })

  it('возвращает пустой набор для пустого выбора', () => {
    expect(ids([])).toEqual(new Set())
  })

  it('сообщает о недостающем маркере, не выдумывая id', () => {
    const withoutJamMarker: ProductTopping[] = [
      { id: 10, name: 'клубничный джем', kind: 'jam' },
    ]

    const result = resolveToppingIds([10], withoutJamMarker)

    expect(result.toppingIds).toEqual([10])
    expect(result.missingMarkers).toEqual([{ name: 'джем', kind: 'jam' }])
  })

  it('не просит создать маркер, если он есть в каталоге', () => {
    const result = resolveToppingIds([1, 4], catalog)

    expect(result.missingMarkers).toEqual([])
    expect(new Set(result.toppingIds)).toEqual(new Set([1, 2, 3, 4]))
  })
})
