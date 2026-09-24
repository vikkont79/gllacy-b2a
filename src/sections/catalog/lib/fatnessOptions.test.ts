import { describe, expect, it } from 'vitest'

import { FATNESS_OPTIONS } from './fatnessOptions'

describe('FATNESS_OPTIONS', () => {
  it('содержит ровно три опции', () => {
    expect(FATNESS_OPTIONS).toHaveLength(3)
  })

  it('покрывает все base-категории ровно по разу', () => {
    expect(FATNESS_OPTIONS.map((option) => option.base)).toEqual([
      'sorbet',
      'slivochnoe',
      'plombir',
    ])
  })

  it('содержит ЗОЖ-подписи жирности', () => {
    expect(FATNESS_OPTIONS.map((option) => option.label)).toEqual([
      'до 5%',
      'до 12%',
      'выше 12%',
    ])
  })
})