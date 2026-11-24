/*
 * Единый формат цены для UI. Цена в БД и типах хранится в копейках,
 * поэтому деление на 100 выполняется только на границе отображения.
 */
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatPrice = (kopecks: number) =>
  priceFormatter.format(kopecks / 100)
