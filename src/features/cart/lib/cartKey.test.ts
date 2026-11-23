import { describe, expect, it } from 'vitest'

import { guestCartKey, userCartKey } from './cartKey'

describe('guestCartKey', () => {
  it('строит ключ гостевой корзины с префиксом проекта', () => {
    expect(guestCartKey('uuid')).toBe('gllacy:cart:guest:uuid')
  })
})

describe('userCartKey', () => {
  it('строит ключ корзины аккаунта с префиксом проекта', () => {
    expect(userCartKey('user-id')).toBe('gllacy:cart:user:user-id')
  })
})
