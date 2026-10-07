import { parseCatalogParams } from '@/sections/catalog/lib'
import { createCatalogUrl } from '@/entities/product/lib'
import { createBreadcrumbs } from '@/sections/catalog/lib/createBreadcrumbs'
import { getProducts } from '@/entities/product/api/getProducts'
import { getPriceBounds } from '@/entities/product/api/getPriceBounds'
import type { ProductRow } from '@/entities/product'
import type { PriceBounds } from '@/entities/product/types'
import { ErrorState, JsonLd } from '@/shared/ui'
import { buildBreadcrumbsJsonLd } from '@/widgets/breadcrumbs'
import { CatalogHeader } from '../CatalogHeader/CatalogHeader'
import { CatalogFilter } from '../CatalogFilter/CatalogFilter'
import { CatalogPagination } from '../CatalogPagination/CatalogPagination'
import { CatalogList } from '../CatalogList/CatalogList'
import styles from './Catalog.module.css'

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
  const options = parseCatalogParams(await searchParams)
  const crumbs = createBreadcrumbs(options)
  const breadcrumbJsonLd = buildBreadcrumbsJsonLd(crumbs)

  let products: ProductRow[] = []
  let total = 0
  let productsError = false

  let priceBounds: PriceBounds | null = null

  try {
    const result = await getProducts(options)
    products = result.items
    total = result.total
  } catch (error) {
    console.error('CatalogPage: не удалось загрузить каталог:', error)
    productsError = true
  }

  try {
    priceBounds = await getPriceBounds(options)
  } catch (error) {
    console.error('CatalogPage: не удалось загрузить диапазон цен:', error)
  }

  return (
    <>
      {/* Разметка вне main: агент читает документ до отрисованной страницы. */}
      <JsonLd data={breadcrumbJsonLd} />

      <main id="content" tabIndex={-1} className="wrapper">
        <CatalogHeader crumbs={crumbs} />
        <section className={styles.products}>
          <h2 className="visually-hidden">Список товаров с фильтрами.</h2>
          <CatalogFilter
            key={createCatalogUrl(options)}
            className={styles.filter}
            initialOptions={options}
            priceBounds={priceBounds ?? undefined}
          />
          {productsError ? (
            <ErrorState message="Не удалось загрузить каталог. Попробуйте позже" />
          ) : products.length === 0 ? (
            <p>Сейчас в продаже нет товаров. Загляните позже</p>
          ) : (
            <CatalogList products={products} />
          )}
          <CatalogPagination className={styles.pagination} options={options} total={total} />
        </section>
      </main>
    </>
  )
}

export { CatalogPage }