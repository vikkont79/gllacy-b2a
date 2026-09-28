import { describe, expect, it } from 'vitest'
import { getCatalogTitle } from './catalog'

describe('getCatalogTitle', () => {
  it('при isNew возвращает «Новинки»', () => {
    expect(getCatalogTitle({ isNew: true })).toBe('Новинки')
  })
  it('isNew приоритетнее base', () => {
    expect(getCatalogTitle({ base: 'plombir', isNew: true })).toBe('Новинки')
  })
  it('возвращает название категории по base', () => {
    expect(getCatalogTitle({ base: 'plombir' })).toBe('Пломбир')
  })
  it('без параметров возвращает «Все продукты»', () => {
    expect(getCatalogTitle()).toBe('Все продукты')
  })
})