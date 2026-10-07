/*
 * Разметка карточки товара для поисковых агентов. Только серверный модуль.
 *
 * Здесь не общий билдер сайта, а цифровая копия конкретной витрины: цена на
 * сегодня, наличие на сегодня, состав именно этой позиции. Поэтому лежит в
 * секции, а не в shared/config — и работает с Product напрямую.
 *
 * Наполнители в разметку не идут: их роль — сузить выбор в фильтре каталога,
 * а состав и так лежит в ingredients, а вкус — в name и description. Пока в
 * базе лежат категории («кусочки», «джем»), отдельное поле только дублировало
 * бы уже сказанное. С появлением конкретных вкусов вопрос вернётся.
 */

import type { Product } from '@/entities/product'
import { SITE_NAME, SITE_URL } from '@/shared/config'

export const buildProductJsonLd = (product: Product) => {
  const {
    slug,
    name,
    description,
    image,
    composition,
    price,
    calories,
    protein,
    fat,
    carbs,
    isAvailable,
  } = product

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${SITE_URL}/${image}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '100 г',
      calories: `${calories} ккал`,
      proteinContent: `${protein} г`,
      fatContent: `${fat} г`,
      carbohydrateContent: `${carbs} г`,
    },
    ingredients: composition,
    offers: {
      '@type': 'Offer',
      price: price / 100,
      priceCurrency: 'RUB',
      availability: isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/products/${slug}`,
      additionalProperty: {
        '@type': 'PropertyValue',
        name: 'Единица измерения',
        value: 'кг',
      },
    },
  }
}
