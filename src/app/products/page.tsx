import type { Metadata } from 'next'
import { CatalogPage } from '@/sections/catalog'

export const metadata: Metadata = {
  title: 'Каталог | Gllacy Shop',
}

export default function Products() {
  return (
    <CatalogPage />
  )
}
