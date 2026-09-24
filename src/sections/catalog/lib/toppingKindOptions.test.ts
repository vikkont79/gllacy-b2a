import { describe, expect, it } from 'vitest'

import { TOPPING_KIND_OPTIONS } from './toppingKindOptions'

describe('TOPPING_KIND_OPTIONS', () => {
  it('содержит ровно четыре опции', () => {
    expect(TOPPING_KIND_OPTIONS).toHaveLength(4)
  })

  it('покрывает все kinds ровно по разу', () => {
    expect(TOPPING_KIND_OPTIONS.map((option) => option.kind)).toEqual([
      'chunk',
      'topping',
      'syrup',
      'sprinkle',
    ])
  })

  it('содержит подписи по группам', () => {
    expect(TOPPING_KIND_OPTIONS.map((option) => option.label)).toEqual([
      'Кусочки',
      'Топпинги',
      'Сиропы',
      'Посыпки',
    ])
  })
})