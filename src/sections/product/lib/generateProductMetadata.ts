import type { Metadata } from 'next'

import { getProduct } from '@/entities/product/api/getProduct'

/*
 * Метаданные страницы товара. title и description берутся из полей самой
 * позиции, поэтому нужен запрос в БД — на роуте это запрещено правилом
 * AGENTS.md, поэтому сборка живёт здесь, а роут только реэкспортирует её.
 *
 * Сигнатура повторяет Next: движок сам передаёт { params }. Роут остаётся
 * чистым роутингом и ничего про slug не знает.
 *
 * getProduct обёрнут в cache(), поэтому этот вызов и вызов из ProductPage
 * схлопываются в один поход в Turso.
 *
 * Несуществующий товар даёт пустые метаданные: 404 всё равно отдаст страница
 * через notFound(), падать здесь нельзя.
 */
export const generateProductMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return {}

  return {
    title: product.name,
    description: product.description,
  }
}