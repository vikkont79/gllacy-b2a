import { createCatalogUrl, parseCatalogParams } from '@/sections/catalog/lib'
import { getProducts } from '@/entities/product/api/getProducts'
import { getPriceBounds } from '@/entities/product/api/getPriceBounds'
import type { ProductRow } from '@db/schema'
import type { PriceBounds } from '@/entities/product/types'
import { ErrorState } from '@/shared/ui'
import { getCatalogTitle } from '@/shared/config'
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
  const title = getCatalogTitle(options.base)

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
    <main id="content" tabIndex={-1} className="wrapper">
      <CatalogHeader title={title} />
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
  )
}

export { CatalogPage }