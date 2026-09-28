import { describe, expect, it } from 'vitest'
import { createBreadcrumbs } from './createBreadcrumbs'

describe('createBreadcrumbs', () => {
  it('всегда возвращает три звена', () => {
    expect(createBreadcrumbs({})).toHaveLength(3)
  })
  it('первое — Главная на /', () => {
    expect(createBreadcrumbs({})[0]).toEqual({ name: 'Главная', url: '/' })
  })
  it('второе — Каталог на /products', () => {
    expect(createBreadcrumbs({})[1]).toEqual({ name: 'Каталог', url: '/products' })
  })
  it('без фильтров третье — Все продукты на /products', () => {
    expect(createBreadcrumbs({})[2]).toEqual({ name: 'Все продукты', url: '/products' })
  })
  it('фильтр base отражается в имени и url третьего', () => {
    expect(createBreadcrumbs({ base: 'plombir' })[2]).toEqual({
      name: 'Пломбир',
      url: '/products?base=plombir',
    })
  })
})