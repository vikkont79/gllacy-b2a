import { describe, expect, it } from 'vitest'
import type { Product } from '@/entities/product'
import { SITE_NAME, SITE_URL } from '@/shared/config'
import { buildProductJsonLd } from './buildProductJsonLd'

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  slug: 'fistashka',
  name: 'Фисташка',
  base: 'plombir',
  flavourId: 1,
  flavour: 'есть: вкус',
  price: 31000,
  calories: 230,
  protein: 5.5,
  fat: 18,
  carbs: 16.5,
  shelfLife: 24,
  image: 'products/pistacio-taste.png',
  description: 'Пломбир с фисташкой.',
  composition: 'молоко цельное, сливки 30%, фисташки 8%',
  isAvailable: true,
  isNew: false,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  toppings: [],
  ...overrides,
})

describe('buildProductJsonLd', () => {
  it('Product с контекстом', () => {
    const jsonLd = buildProductJsonLd(makeProduct())

    expect(jsonLd['@context']).toBe('https://schema.org')
    expect(jsonLd['@type']).toBe('Product')
  })

  it('image абсолютный, собран от SITE_URL без двойного слэша', () => {
    const jsonLd = buildProductJsonLd(makeProduct())

    expect(jsonLd.image).toBe(`${SITE_URL}/products/pistacio-taste.png`)
    expect(jsonLd.image).not.toContain('//products')
  })

  it('brand берётся из конфига', () => {
    const jsonLd = buildProductJsonLd(makeProduct())

    expect(jsonLd.brand).toEqual({ '@type': 'Brand', name: SITE_NAME })
  })

  it('url предложения ведёт на страницу товара', () => {
    const jsonLd = buildProductJsonLd(makeProduct())

    expect(jsonLd.offers.url).toBe(`${SITE_URL}/products/fistashka`)
  })

  describe('пищевая ценность', () => {
    it('порция 100 г, значения с единицами', () => {
      const jsonLd = buildProductJsonLd(makeProduct())

      expect(jsonLd.nutrition).toEqual({
        '@type': 'NutritionInformation',
        servingSize: '100 г',
        calories: '230 ккал',
        proteinContent: '5.5 г',
        fatContent: '18 г',
        carbohydrateContent: '16.5 г',
      })
    })
  })

  describe('цена', () => {
    it('копейки из БД делятся на 100', () => {
      const jsonLd = buildProductJsonLd(makeProduct())

      expect(jsonLd.offers.price).toBe(310)
    })

    it('валюта рублями', () => {
      const jsonLd = buildProductJsonLd(makeProduct())

      expect(jsonLd.offers.priceCurrency).toBe('RUB')
    })

    it('единица измерения «кг» рядом с ценой, а не priceSpecification', () => {
      const jsonLd = buildProductJsonLd(makeProduct())

      expect(jsonLd.offers.additionalProperty).toEqual({
        '@type': 'PropertyValue',
        name: 'Единица измерения',
        value: 'кг',
      })
      expect('priceSpecification' in jsonLd.offers).toBe(false)
    })
  })

  describe('наличие', () => {
    it('isAvailable true даёт InStock', () => {
      const jsonLd = buildProductJsonLd(makeProduct({ isAvailable: true }))

      expect(jsonLd.offers.availability).toBe('https://schema.org/InStock')
    })

    it('isAvailable false даёт OutOfStock, а не исчезновение страницы', () => {
      const jsonLd = buildProductJsonLd(makeProduct({ isAvailable: false }))

      expect(jsonLd.offers.availability).toBe('https://schema.org/OutOfStock')
      expect(jsonLd.name).toBe('Фисташка')
    })
  })

  describe('состав', () => {
    it('composition идёт в ingredients как есть', () => {
      const composition = 'молоко цельное, сливки 30%, фисташки 8%'
      const jsonLd = buildProductJsonLd(makeProduct({ composition }))

      expect(jsonLd.ingredients).toBe(composition)
    })
  })

  describe('внутренние поля', () => {
    it('flavour-заглушка не попадает в разметку', () => {
      const jsonLd = buildProductJsonLd(makeProduct({ flavour: 'есть: вкус' }))

      expect(JSON.stringify(jsonLd)).not.toContain('есть: вкус')
    })

    it('служебные поля не попадают в разметку', () => {
      const jsonLd = buildProductJsonLd(makeProduct())

      expect('id' in jsonLd).toBe(false)
      expect('createdAt' in jsonLd).toBe(false)
      expect('updatedAt' in jsonLd).toBe(false)
      expect('shelfLife' in jsonLd).toBe(false)
      expect('isNew' in jsonLd).toBe(false)
    })
  })
})
