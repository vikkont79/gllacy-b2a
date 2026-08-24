import { MainPage } from '@/sections/main'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Главная | Gllacy Shop',
}

export default function Home() {
  return (
    <MainPage />
  );
}