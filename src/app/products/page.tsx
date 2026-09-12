import type { Metadata } from 'next'
import { CatalogPage } from '@/sections/catalog'

export const metadata: Metadata = {
  title: 'Каталог',
  description:
    'Каталог мороженого: подбор вкуса по жирности, наполнителям и цене, ' +
    'сортировка по популярности и стоимости.',
}

export default function Products() {
  return (
    <CatalogPage />
  )
}
