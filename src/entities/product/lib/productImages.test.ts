import { readdirSync } from 'node:fs'
import { basename, resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { PRODUCT_IMAGE_LABELS, PRODUCT_IMAGE_VALUES } from './productImages'

const PRODUCTS_DIR = resolve(process.cwd(), 'public/products')

describe('PRODUCT_IMAGE_VALUES', () => {
  it('указывает только на существующие файлы', () => {
    const files = new Set(readdirSync(PRODUCTS_DIR))

    for (const value of PRODUCT_IMAGE_VALUES) {
      expect(files.has(basename(value)), `нет файла ${value}`).toBe(true)
    }
  })

  it('перечисляет все png из public/products', () => {
    const files = readdirSync(PRODUCTS_DIR)
      .filter((file) => file.endsWith('.png'))
      .sort()

    const listed = PRODUCT_IMAGE_VALUES.map((value) => basename(value)).sort()

    expect(listed).toEqual(files)
  })

  it('не содержит дублей', () => {
    expect(new Set(PRODUCT_IMAGE_VALUES).size).toBe(PRODUCT_IMAGE_VALUES.length)
  })

  it('у каждой картинки есть подпись', () => {
    for (const value of PRODUCT_IMAGE_VALUES) {
      expect(PRODUCT_IMAGE_LABELS[value]).toBeTruthy()
    }
  })
})
