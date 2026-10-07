import { describe, expect, it } from 'vitest'
import type { Product } from '@/entities/product'
import { createProductCrumbs } from './createProductCrumbs'

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  slug: 'fistashka',
  name: 'Фисташка',
  base: 'plombir',
  flavourId: 1,
  flavour: 'есть: вкус',
  price: 34000,
  calories: 250,
  protein: 5.5,
  fat: 18,
  carbs: 16.5,
  shelfLife: 24,
  image: 'products/pistacio-taste.png',
  description: 'Фисташковый пломбир с кусочками шоколада',
  composition: 'молоко цельное, сливки 30%, фисташки 8%',
  isAvailable: true,
  isNew: false,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  toppings: [],
  ...overrides,
})

describe('createProductCrumbs', () => {
  it('всегда возвращает четыре звена', () => {
    expect(createProductCrumbs(makeProduct())).toHaveLength(4)
  })

  it('первые два звена — Главная и Каталог', () => {
    const crumbs = createProductCrumbs(makeProduct())

    expect(crumbs[0]).toEqual({ name: 'Главная', url: '/' })
    expect(crumbs[1]).toEqual({ name: 'Каталог', url: '/products' })
  })

  it('третье звено — раздел из base, с его подписью и ссылкой', () => {
    const crumbs = createProductCrumbs(makeProduct({ base: 'plombir' }))

    expect(crumbs[2]).toEqual({ name: 'Пломбир', url: '/products?base=plombir' })
  })

  it('другая основа даёт свой раздел', () => {
    const crumbs = createProductCrumbs(makeProduct({ base: 'sorbet' }))

    expect(crumbs[2]).toEqual({ name: 'Сорбеты', url: '/products?base=sorbet' })
  })

  it('последнее звено — имя товара, не транслит из slug', () => {
    const crumbs = createProductCrumbs(makeProduct())

    expect(crumbs[3]).toEqual({ name: 'Фисташка', url: '/products/fistashka' })
  })
})