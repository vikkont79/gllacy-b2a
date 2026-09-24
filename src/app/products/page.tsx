import type { Metadata } from 'next'
import { CatalogPage } from '@/sections/catalog'
import { parseCatalogParams } from '@/sections/catalog/lib'
import { getCatalogTitle } from '@/shared/config'

const CATALOG_DESCRIPTION =
  'Мороженое под заказ: подбор вкуса по жирности, наполнителям и цене, ' +
  'сортировка по популярности и стоимости.'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const options = parseCatalogParams(await searchParams)

  const title = options.isNew
    ? 'Новинки мороженого'
    : getCatalogTitle(options.base)

  return {
    title,
    description: CATALOG_DESCRIPTION,
  }
}

export default function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  return (
    <CatalogPage searchParams={searchParams} />
  )
}