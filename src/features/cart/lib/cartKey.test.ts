import { describe, expect, it } from 'vitest'

import { cartKey } from './cartKey'

describe('cartKey', () => {
  it('строит ключ корзины с префиксом проекта', () => {
    expect(cartKey('uuid')).toBe('gllacy:cart:uuid')
  })
})
