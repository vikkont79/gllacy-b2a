import { describe, expect, it } from 'vitest'

import { formatProductCount } from './formatProductCount'

describe('formatProductCount', () => {
  it.each([
    [0, '0 товарах'],
    [1, '1 товаре'],
    [2, '2 товарах'],
    [4, '4 товарах'],
    [5, '5 товарах'],
    [11, '11 товарах'],
    [21, '21 товаре'],
    [22, '22 товарах'],
    [101, '101 товаре'],
    [111, '111 товарах'],
  ] as const)('%i → %s', (count, expected) => {
    expect(formatProductCount(count)).toBe(expected)
  })
})
