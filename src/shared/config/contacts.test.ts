import { describe, expect, it } from 'vitest'
import { CONTACT_PHONE, OPENING_HOURS, phoneHref } from './contacts'

const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const

describe('CONTACT_PHONE', () => {
  it('raw в формате E.164', () => {
    expect(CONTACT_PHONE.raw).toMatch(/^\+7\d{10}$/)
  })
  it('display в формате «+7 900 647-03-52»', () => {
    expect(CONTACT_PHONE.display).toMatch(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/)
  })
  it('display и raw описывают один номер', () => {
    expect(CONTACT_PHONE.display.replace(/\D/g, '')).toBe(CONTACT_PHONE.raw.replace('+', ''))
  })
})

describe('phoneHref', () => {
  it('строит tel-ссылку из raw', () => {
    expect(phoneHref(CONTACT_PHONE.raw)).toBe(`tel:${CONTACT_PHONE.raw}`)
  })
})

describe('OPENING_HOURS', () => {
  it('семь уникальных дней Mo–Su', () => {
    expect(OPENING_HOURS.days).toHaveLength(7)
    expect(new Set(OPENING_HOURS.days).size).toBe(7)
    expect([...OPENING_HOURS.days].sort()).toEqual([...WEEK_DAYS].sort())
  })
  it('opens и closes в формате HH:MM', () => {
    expect(OPENING_HOURS.opens).toMatch(/^\d{2}:\d{2}$/)
    expect(OPENING_HOURS.closes).toMatch(/^\d{2}:\d{2}$/)
  })
})