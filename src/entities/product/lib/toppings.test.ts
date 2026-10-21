import { describe, expect, it } from 'vitest'

import { isMarkerTopping, TOPPING_KIND_OPTIONS } from './toppings'

describe('TOPPING_KIND_OPTIONS', () => {
  it('содержит ровно четыре опции', () => {
    expect(TOPPING_KIND_OPTIONS).toHaveLength(4)
  })

  it('покрывает все kinds ровно по разу', () => {
    expect(TOPPING_KIND_OPTIONS.map((option) => option.kind)).toEqual([
      'chunk',
      'jam',
      'syrup',
      'sprinkle',
    ])
  })

  it('подписи совпадают с именами маркеров в нижнем регистре', () => {
    expect(TOPPING_KIND_OPTIONS.map((option) => option.label)).toEqual([
      'Кусочки',
      'Джем',
      'Сироп',
      'Посыпка',
    ])
    expect(TOPPING_KIND_OPTIONS.map((option) => option.label.toLowerCase())).toEqual([
      'кусочки',
      'джем',
      'сироп',
      'посыпка',
    ])
  })
})

describe('isMarkerTopping', () => {
  it('узнаёт маркеры по имени вида', () => {
    expect(isMarkerTopping({ name: 'кусочки', kind: 'chunk' })).toBe(true)
    expect(isMarkerTopping({ name: 'джем', kind: 'jam' })).toBe(true)
    expect(isMarkerTopping({ name: 'сироп', kind: 'syrup' })).toBe(true)
    expect(isMarkerTopping({ name: 'посыпка', kind: 'sprinkle' })).toBe(true)
  })

  it('не считает маркером именованный наполнитель', () => {
    expect(isMarkerTopping({ name: 'клубничный джем', kind: 'jam' })).toBe(false)
  })

  it('не путает имя маркера с чужим видом', () => {
    expect(isMarkerTopping({ name: 'джем', kind: 'syrup' })).toBe(false)
  })
})
