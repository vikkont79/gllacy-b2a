import { MainPage } from '@/sections/main'
import { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Главная',
  description:
    'Мороженое собственного производства под заказ: лучшие товары, акции с подарками, ' +
    'вкусы и новинки, доставка на дом.',
}

export default function Home() {
  return (
    <MainPage />
  )
}