import type { Metadata } from 'next'

import { CartPage } from '@/sections/cart'

export const metadata: Metadata = {
  title: 'Корзина',
  robots: { index: false, follow: false },
}

export default function Cart() {
  return <CartPage />
}
