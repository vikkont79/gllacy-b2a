import { describe, expect, it } from 'vitest'

import { slugify } from './slugify'

describe('slugify', () => {
  it('транслитерирует кириллицу', () => {
    expect(slugify('Малинка')).toBe('malinka')
    expect(slugify('Пломбир')).toBe('plombir')
    expect(slugify('Крем-брюле')).toBe('krem-bryule')
  })

  it('превращает пробелы и знаки в дефис', () => {
    expect(slugify('Пломбир с клубникой')).toBe('plombir-s-klubnikoy')
    expect(slugify('  Пломбир — с  ягодами  ')).toBe('plombir-s-yagodami')
    expect(slugify('Vegan 2.0')).toBe('vegan-2-0')
  })

  it('схлопывает повторные разделители и обрезает края', () => {
    expect(slugify('-- Тест --')).toBe('test')
    expect(slugify('а   б')).toBe('a-b')
  })

  it('обрабатывает й, ё, ь, ъ, ы, ю, я', () => {
    expect(slugify('Чай')).toBe('chay')
    expect(slugify('Ёжик')).toBe('ezhik')
    expect(slugify('Медведь')).toBe('medved')
    expect(slugify('Объект')).toBe('obekt')
    expect(slugify('Сыр')).toBe('syr')
    expect(slugify('Юбилейный')).toBe('yubileynyy')
    expect(slugify('Яблоко')).toBe('yabloko')
  })

  it('обрабатывает шипящие и ц', () => {
    expect(slugify('Желе')).toBe('zhele')
    expect(slugify('Хлеб')).toBe('khleb')
    expect(slugify('Цитрус')).toBe('tsitrus')
    expect(slugify('Черника')).toBe('chernika')
    expect(slugify('Шоколад')).toBe('shokolad')
    expect(slugify('Щербет')).toBe('shcherbet')
  })

  it('сохраняет латиницу и цифры, приводя к нижнему регистру', () => {
    expect(slugify('Vegan-2')).toBe('vegan-2')
    expect(slugify('ABC')).toBe('abc')
  })

  it('возвращает пустую строку, если допустимых символов не осталось', () => {
    expect(slugify('!!!')).toBe('')
    expect(slugify('   ')).toBe('')
  })
})
