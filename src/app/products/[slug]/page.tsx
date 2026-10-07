import type { Metadata } from 'next'

import { generateProductMetadata, ProductPage } from '@/sections/product'

/*
 * Метаданные собирает секция: title и description берутся из полей товара, а
 * запрос в БД на роуте запрещён. Здесь только передача параметров. Next требует
 * именованный экспорт, хотя правило экспортов в app/ запрещает — исключение
 * зафиксировано в AGENTS.md.
 *
 * Тип Promise<Metadata> проставлен явно: реэкспорт его бы не показал, и проверка
 * Next-тул ругалась бы на сигнатуру.
 */
export const generateMetadata = ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> =>
  generateProductMetadata({ params })

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <ProductPage slug={slug} />
}