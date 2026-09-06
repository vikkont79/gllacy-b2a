import type { StaticImageData } from 'next/image'
import bananaTasteImg from '@/shared/assets/images/products/banana-taste.png'
import blackberryTasteImg from '@/shared/assets/images/products/blackberry-taste.png'
import blueberryTasteImg from '@/shared/assets/images/products/blueberry-taste.png'
import bubblegumTasteImg from '@/shared/assets/images/products/bubblegum-taste.png'
import chokolateTasteImg from '@/shared/assets/images/products/chokolate-taste.png'
import creamTasteImg from '@/shared/assets/images/products/cream-taste.png'
import lemonTasteImg from '@/shared/assets/images/products/lemon-taste.png'
import mentholTasteImg from '@/shared/assets/images/products/menthol-taste.png'
import nutTasteImg from '@/shared/assets/images/products/nut-taste.png'
import pistacioTasteImg from '@/shared/assets/images/products/pistacio-taste.png'
import raspberryTasteImg from '@/shared/assets/images/products/raspberry-taste.png'
import strawberryTasteImg from '@/shared/assets/images/products/strawberry-taste.png'

export interface Product {
  id: string
  title: string
  description: string
  price: number
  img: StaticImageData
  alt: string
}

export const products: Product[] = [
  {
    id: 'malinka',
    title: 'Малинка',
    description: 'Сливочное мороженое с малиновым джемом',
    price: 310,
    img: raspberryTasteImg,
    alt: 'Шарик мороженого вкус малина.',
  },
  {
    id: 'fistashka',
    title: 'Фисташка',
    description: 'Фисташковый пломбир с кусочками шоколада',
    price: 340,
    img: pistacioTasteImg,
    alt: 'Шарик мороженого вкус фисташка.',
  },
  {
    id: 'chernika',
    title: 'Черника',
    description: 'Крем-брюле с черничным джемом',
    price: 330,
    img: blueberryTasteImg,
    alt: 'Шарик мороженого вкус черника.',
  },
  {
    id: 'babl-gam',
    title: 'Бабл-гам',
    description: 'Ванильный пломбир со сладкой посыпкой',
    price: 320,
    img: bubblegumTasteImg,
    alt: 'Шарик мороженого вкус баблгам.',
  },
  {
    id: 'ezhevika',
    title: 'Ежевика',
    description: 'Сливочное мороженое с ежевичным джемом',
    price: 330,
    img: blackberryTasteImg,
    alt: 'Шарик мороженого вкус ежевика.',
  },
  {
    id: 'banan',
    title: 'Банан',
    description: 'Сливочный пломбир с банановым вкусом',
    price: 340,
    img: bananaTasteImg,
    alt: 'Шарик мороженого вкус банан.',
  },
  {
    id: 'shokoladka',
    title: 'Шоколадка',
    description: 'Классический шоколадный пломбир',
    price: 270,
    img: chokolateTasteImg,
    alt: 'Шарик мороженого вкус шоколад.',
  },
  {
    id: 'klubnichka',
    title: 'Клубничка',
    description: 'Сливочный пломбир с клубничным вкусом',
    price: 300,
    img: strawberryTasteImg,
    alt: 'Шарик мороженого вкус клубника.',
  },
  {
    id: 'limon',
    title: 'Лимон',
    description: 'Освежающий лимонный сорбет',
    price: 310,
    img: lemonTasteImg,
    alt: 'Шарик мороженого вкус лимон.',
  },
  {
    id: 'mentol',
    title: 'Ментол',
    description: 'Сливочный пломбир с ментоловым сиропом',
    price: 320,
    img: mentholTasteImg,
    alt: 'Шарик мороженого вкус ментол.',
  },
  {
    id: 'oreshek',
    title: 'Орешек',
    description: 'Фисташковый пломбир с шоколадным сиропом',
    price: 360,
    img: nutTasteImg,
    alt: 'Шарик мороженого вкус фисташка с шоколадом.',
  },
  {
    id: 'krem-bryule',
    title: 'Крем-брюле',
    description: 'Классическое крем-брюле',
    price: 280,
    img: creamTasteImg,
    alt: 'Шарик мороженого вкус крем-брюле.',
  },
]