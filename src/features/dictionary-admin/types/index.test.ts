import { describe, expect, it } from 'vitest'

import { toppingCreateSchema, toppingNameSchema } from './index'

describe('toppingNameSchema', () => {
  it('нормализует имя', () => {
    const result = toppingNameSchema.safeParse('  Клубничный   Джем ')

    expect(result.success && result.data).toBe('клубничный джем')
  })

  it.each([
    ['пустое', ''],
    ['из пробелов', '   '],
    ['маркерное', 'джем'],
    ['длиннее 60', 'а'.repeat(61)],
    ['с недопустимым символом', 'клубничный!'],
  ])('отклоняет: %s', (_label, value) => {
    expect(toppingNameSchema.safeParse(value).success).toBe(false)
  })

  it('принимает дефис и цифры', () => {
    expect(toppingNameSchema.safeParse('клубника-2').success).toBe(true)
  })
})

describe('toppingCreateSchema', () => {
  it('принимает известный вид и имя', () => {
    expect(
      toppingCreateSchema.safeParse({
        kind: 'jam',
        name: 'Клубничный',
      }).success,
    ).toBe(true)
  })

  it('отклоняет неизвестный вид', () => {
    expect(
      toppingCreateSchema.safeParse({
        kind: 'topping',
        name: 'Клубничный',
      }).success,
    ).toBe(false)
  })
})
