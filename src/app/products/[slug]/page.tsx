import { ProductPage } from '@/sections/product'

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <ProductPage slug={slug} />
}