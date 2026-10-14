import { describe, expect, it } from 'vitest'

import { magicLinkSchema } from './index'

describe('magicLinkSchema', () => {
  it('принимает корректный email', () => {
    const result = magicLinkSchema.safeParse({ email: 'ivan@mail.ru' })

    expect(result.success).toBe(true)
  })

  it('приводит email к нижнему регистру', () => {
    const result = magicLinkSchema.safeParse({ email: 'Ivan@Mail.RU' })

    expect(result.success && result.data.email).toBe('ivan@mail.ru')
  })

  it('обрезает пробелы по краям', () => {
    const result = magicLinkSchema.safeParse({ email: '  ivan@mail.ru  ' })

    expect(result.success && result.data.email).toBe('ivan@mail.ru')
  })

  it('не принимает пустой email', () => {
    expect(magicLinkSchema.safeParse({ email: '' }).success).toBe(false)
    expect(magicLinkSchema.safeParse({ email: '   ' }).success).toBe(false)
  })

  it('не принимает email без домена', () => {
    expect(magicLinkSchema.safeParse({ email: 'ivan' }).success).toBe(false)
    expect(magicLinkSchema.safeParse({ email: 'ivan@' }).success).toBe(false)
  })
})