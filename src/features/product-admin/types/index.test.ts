import { describe, expect, it } from 'vitest'

import { productFormSchema } from './index'

const validValues = {
  name: 'Клубничное мороженое',
  slug: 'strawberry',
  base: 'plombir' as const,
  flavourId: 2,
  price: 199,
  calories: 210,
  protein: 3.5,
  fat: 12,
  carbs: 24,
  shelfLife: 60,
  image: 'products/strawberry-taste.png' as const,
  description: 'Нежное мороженое с клубникой',
  composition: 'Молоко, сливки, клубника',
  isAvailable: true,
  isNew: false,
  toppingIds: [1, 3],
}

describe('productFormSchema', () => {
  it('принимает корректный объект', () => {
    expect(productFormSchema.safeParse(validValues).success).toBe(true)
  })

  it('приводит строки из инпутов к числам', () => {
    const result = productFormSchema.safeParse({
      ...validValues,
      flavourId: '2',
      price: '199',
      calories: '210',
      protein: '3.5',
      fat: '12',
      carbs: '24',
      shelfLife: '60',
      toppingIds: ['1', '3'],
    })

    expect(result.success).toBe(true)
    expect(result.success && result.data.price).toBe(199)
    expect(result.success && result.data.toppingIds).toEqual([1, 3])
  })

  it('принимает дробную цену', () => {
    expect(productFormSchema.safeParse({ ...validValues, price: 199.5 }).success).toBe(true)
  })

  it('принимает пустой toppingIds', () => {
    const result = productFormSchema.safeParse({ ...validValues, toppingIds: [] })

    expect(result.success).toBe(true)
    expect(result.success && result.data.toppingIds).toEqual([])
  })

  it('обрезает пробелы в имени, slug и текстах', () => {
    const result = productFormSchema.safeParse({
      ...validValues,
      name: '  Клубничное мороженое  ',
      slug: '  strawberry  ',
      description: '  Нежное мороженое  ',
      composition: '  Молоко, сливки  ',
    })

    expect(result.success && result.data.name).toBe('Клубничное мороженое')
    expect(result.success && result.data.slug).toBe('strawberry')
    expect(result.success && result.data.description).toBe('Нежное мороженое')
    expect(result.success && result.data.composition).toBe('Молоко, сливки')
  })

  it.each([
    ['пустое название', { name: '' }],
    ['название из пробелов', { name: '   ' }],
    ['пустой slug', { slug: '' }],
    ['slug с кириллицей', { slug: 'клубника' }],
    ['slug с подчёркиванием', { slug: 'cream_ice' }],
    ['slug с дефисом в начале', { slug: '-cream' }],
    ['slug с дефисом в конце', { slug: 'cream-' }],
    ['неизвестная база', { base: 'icecream' }],
    ['неизвестная картинка', { image: 'products/unknown.png' }],
    ['нулевая цена', { price: 0 }],
    ['отрицательная цена', { price: -10 }],
    ['пустой вкус', { flavourId: 0 }],
    ['дробная калорийность', { calories: 210.5 }],
    ['отрицательная калорийность', { calories: -1 }],
    ['отрицательные белки', { protein: -1 }],
    ['отрицательные жиры', { fat: -1 }],
    ['отрицательные углеводы', { carbs: -1 }],
    ['нулевой срок хранения', { shelfLife: 0 }],
    ['дробный срок хранения', { shelfLife: 1.5 }],
    ['пустое описание', { description: '' }],
    ['пустой состав', { composition: '' }],
  ])('отклоняет: %s', (_label, patch) => {
    expect(productFormSchema.safeParse({ ...validValues, ...patch }).success).toBe(false)
  })
})
