/*
 * Цена в БД — копейки. Показываем рубли: «199 ₽», «199,5 ₽».
 * Форматтер создаётся один раз на модуль, а не на каждую строку списка.
 */
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatPrice = (kopecks: number) => priceFormatter.format(kopecks / 100)
