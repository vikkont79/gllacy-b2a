import { describe, expect, it } from 'vitest'

import { clampQuantity, parseQuantityInput } from './quantity'

describe('parseQuantityInput', () => {
  it.each([
    ['1', 1],
    ['99', 99],
    [' 5 ', 5],
  ] as const)('%s → %i', (raw, expected) => {
    expect(parseQuantityInput(raw)).toBe(expected)
  })

  it.each(['', '0', '100', '2.5', '2,5', '-1', 'abc', '1e3'])(
    '%s → null',
    (raw) => {
      expect(parseQuantityInput(raw)).toBeNull()
    },
  )
})

describe('clampQuantity', () => {
  it.each([
    [0, 1],
    [1, 1],
    [50, 50],
    [99, 99],
    [100, 99],
    [2.9, 2],
  ] as const)('%d → %d', (value, expected) => {
    expect(clampQuantity(value)).toBe(expected)
  })
})
