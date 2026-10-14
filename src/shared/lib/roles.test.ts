import { describe, expect, it } from 'vitest'

import { isAdminRole } from './roles'

describe('isAdminRole', () => {
  it('признаёт роль admin', () => {
    expect(isAdminRole('admin')).toBe(true)
  })

  it('не признаёт обычного пользователя', () => {
    expect(isAdminRole('user')).toBe(false)
  })

  it('не признаёт пустую роль', () => {
    expect(isAdminRole(null)).toBe(false)
    expect(isAdminRole(undefined)).toBe(false)
  })

  it('сравнивает точно, а не по вхождению', () => {
    expect(isAdminRole('administrator')).toBe(false)
    expect(isAdminRole('admin ')).toBe(false)
    expect(isAdminRole('superadmin')).toBe(false)
  })
})