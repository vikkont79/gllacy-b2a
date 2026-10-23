import { describe, expect, it } from 'vitest'

import type { ProductTopping } from '@/entities/product/types'

import { groupToppingsByKind } from './groupToppingsByKind'

const toppings: ProductTopping[] = [
  { id: 1, name: 'кусочки', kind: 'chunk' },
  { id: 2, name: 'орехи', kind: 'chunk' },
  { id: 3, name: 'джем', kind: 'jam' },
  { id: 4, name: 'вишнёвый', kind: 'jam' },
  { id: 5, name: 'клубничный', kind: 'jam' },
  { id: 6, name: 'сироп', kind: 'syrup' },
  { id: 7, name: 'посыпка', kind: 'sprinkle' },
]

describe('groupToppingsByKind', () => {
  it('возвращает все группы в порядке конфига', () => {
    expect(groupToppingsByKind([]).map(({ kind }) => kind)).toEqual([
      'chunk',
      'jam',
      'syrup',
      'sprinkle',
    ])
  })

  it('исключает маркеры из именованных', () => {
    const [chunk, jam] = groupToppingsByKind(toppings)

    expect(chunk.items.map(({ name }) => name)).toEqual(['орехи'])
    expect(jam.items.map(({ name }) => name)).toEqual([
      'вишнёвый',
      'клубничный',
    ])
  })

  it('сортирует имена по алфавиту', () => {
    const jam = groupToppingsByKind(toppings).find(
      ({ kind }) => kind === 'jam',
    )

    expect(jam?.items.map(({ name }) => name)).toEqual([
      'вишнёвый',
      'клубничный',
    ])
  })

  it('оставляет пустые группы', () => {
    expect(
      groupToppingsByKind([]).every(({ items }) => items.length === 0),
    ).toBe(true)
  })
})
