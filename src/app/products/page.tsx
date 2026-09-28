import type { Metadata } from 'next'
import { CatalogPage } from '@/sections/catalog'
import { parseCatalogParams } from '@/sections/catalog/lib'
import { createBreadcrumbs } from '@/sections/catalog/lib/createBreadcrumbs'
import { buildBreadcrumbListJsonLd, getCatalogTitle } from '@/shared/config'
import { env } from '@/shared/lib/env'
import { JsonLd } from '@/shared/ui'

const CATALOG_DESCRIPTION =
  'Мороженое под заказ: подбор вкуса по жирности, наполнителям и цене, ' +
  'сортировка по популярности и стоимости.'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const options = parseCatalogParams(await searchParams)

  const title = getCatalogTitle(options)

  return {
    title,
    description: CATALOG_DESCRIPTION,
  }
}

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const options = parseCatalogParams(await searchParams)

  const breadcrumb = buildBreadcrumbListJsonLd(
    createBreadcrumbs(options).map((crumb) => ({
      name: crumb.name,
      url: `${env.SITE_URL}${crumb.url}`,
    })),
  )

  return (
    <>
      <JsonLd data={breadcrumb} />
      <CatalogPage searchParams={searchParams} />
    </>
  )
}