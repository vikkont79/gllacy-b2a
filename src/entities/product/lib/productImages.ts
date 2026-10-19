/*
 * Манифест картинок товаров. Значения совпадают с тем, что лежит в
 * products.image: путь относительно public/.
 *
 * Список статический, а не readdir: клиентская форма админки не может
 * читать диск, а на Vercel содержимое public/ не обязано попадать в
 * файловую систему серверной функции. Манифест работает и в клиенте,
 * и на сервере, и проверяется типами.
 */

export const PRODUCT_IMAGE_VALUES = [
  'products/banana-taste.png',
  'products/blackberry-taste.png',
  'products/blueberry-taste.png',
  'products/bubblegum-taste.png',
  'products/chokolate-taste.png',
  'products/cream-taste.png',
  'products/lemon-taste.png',
  'products/menthol-taste.png',
  'products/nut-taste.png',
  'products/pistacio-taste.png',
  'products/raspberry-taste.png',
  'products/strawberry-taste.png',
] as const

export type ProductImage = (typeof PRODUCT_IMAGE_VALUES)[number]

/*
 * Record<ProductImage, string>, а не обычный объект: если в список
 * добавят файл и забудут подпись, TypeScript упадёт на сборке.
 */
export const PRODUCT_IMAGE_LABELS: Record<ProductImage, string> = {
  'products/banana-taste.png': 'Банан',
  'products/blackberry-taste.png': 'Ежевика',
  'products/blueberry-taste.png': 'Голубика',
  'products/bubblegum-taste.png': 'Бабл-гам',
  'products/chokolate-taste.png': 'Шоколад',
  'products/cream-taste.png': 'Сливки',
  'products/lemon-taste.png': 'Лимон',
  'products/menthol-taste.png': 'Мята',
  'products/nut-taste.png': 'Орех',
  'products/pistacio-taste.png': 'Фисташка',
  'products/raspberry-taste.png': 'Малина',
  'products/strawberry-taste.png': 'Клубника',
}

/*
 * Готовый список для Select: value — то, что уйдёт в products.image,
 * label — то, что увидит админ. Держим рядом с манифестом, чтобы форма
 * не собирала это каждый раз сама.
 */
export const PRODUCT_IMAGE_OPTIONS = PRODUCT_IMAGE_VALUES.map((value) => ({
  value,
  label: PRODUCT_IMAGE_LABELS[value],
}))
