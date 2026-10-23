import { describe, expect, it } from 'vitest'

import {
  isReservedToppingName,
  normalizeToppingName,
  RESERVED_TOPPING_NAMES,
} from './toppingName'

describe('normalizeToppingName', () => {
  it('обрезает пробелы и приводит к нижнему регистру', () => {
    expect(normalizeToppingName('  Клубничный  ')).toBe('клубничный')
  })

  it('схлопывает внутренние пробелы', () => {
    expect(normalizeToppingName('клубничный   джем')).toBe('клубничный джем')
  })
})

describe('RESERVED_TOPPING_NAMES', () => {
  it('содержит имена всех маркеров', () => {
    expect([...RESERVED_TOPPING_NAMES]).toEqual([
      'кусочки',
      'джем',
      'сироп',
      'посыпка',
    ])
  })
})

describe('isReservedToppingName', () => {
  it('узнаёт маркерное имя', () => {
    expect(isReservedToppingName('джем')).toBe(true)
  })

  it('не считает маркером именованный наполнитель', () => {
    expect(isReservedToppingName('клубничный')).toBe(false)
  })
})
