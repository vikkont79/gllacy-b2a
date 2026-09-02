'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button, IconButton } from '@/shared/ui'
import icecreamStrawberryCurrent from '@/shared/assets/images/promo/icecream-strawberry-current.png'
import icecreamBananaCurrent from '@/shared/assets/images/promo/icecream-banana-current.png'
import icecreamCaramelCurrent from '@/shared/assets/images/promo/icecream-caramel-current.png'
import styles from './Promo.module.css'

interface PromoImage {
  src: StaticImageData
  alt: string
}

interface PromoSlide {
  title: React.ReactNode
  text: React.ReactNode
  image: PromoImage
}

const slides: PromoSlide[] = [
  {
    title: (
      <>
        Нежный пломбир
        с клубничным джемом
      </>
    ),
    text: (
      <>
        Натуральное мороженое из свежих сливок
        и молока с вкуснейшим клубничным джемом – это
        идеальный десерт для всей семьи.
      </>
    ),
    image: { src: icecreamStrawberryCurrent, alt: 'Клубничный рожок.' },
  },
  {
    title: <>Сливочное мороженое со вкусом банана</>,
    text: (
      <>
        Сливочное мороженое с ярким банановым вкусом подарит вам
        свежесть и наслаждение даже в самый жаркий летний день.
      </>
    ),
    image: { src: icecreamBananaCurrent, alt: 'Банановый рожок.' },
  },
  {
    title: <>Карамельный пломбир с маршмеллоу</>,
    text: (
      <>
        Необычный сладкий десерт с карамельным топпингом и кусочками
        зефира завоюет сердца сладкоежек всех возрастов.
      </>
    ),
    image: { src: icecreamCaramelCurrent, alt: 'Карамельный рожок.' },
    },
]

const slideCount = slides.length

const Promo = () => {
  const trackRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Лента с буферными копиями по краям для бесшовного цикла: [последний, ...все, первый]
  const looped = [slides[slideCount - 1], ...slides, slides[0]]

  // Начальная позиция: показываем настоящий первый слайд (позиция 1 в ленте),
  // т.к. позиция 0 — это буферная копия последнего слайда.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollLeft = track.clientWidth
  }, [])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return

    const index = Math.round(track.scrollLeft / track.clientWidth)
    // Настоящий индекс = позиция в ленте минус один буфер слева.
    const real = index - 1
    if (real < 0 || real >= slideCount) return
    setActiveIndex(real)
  }

  const scrollToReal = (realIndex: number) => {
    const track = trackRef.current
    if (!track) return
    // +1 — пропускаем буфер слева
    track.scrollTo({ left: (realIndex + 1) * track.clientWidth, behavior: 'smooth' })
    setActiveIndex(realIndex)
  }

  const handlePrevious = () => {
    const prev = (activeIndex - 1 + slideCount) % slideCount
    scrollToReal(prev)
  }

  const handleNext = () => {
    const next = (activeIndex + 1) % slideCount
    scrollToReal(next)
  }

  return (
    <section className={styles.promo}>
      <h2 className="visually-hidden">Наши лучшие товары.</h2>
      <div className={styles.slider}>
        <ul className={styles.promoList} ref={trackRef} onScroll={handleScroll}>
          {looped.map((slide, index) => (
            <li key={index} className={styles.promoItem}>
              <div className={styles.icecreamBlock}>
                <div className={styles.description}>
                  <h3 className={`${styles.title} title`}>{slide.title}</h3>
                  <p className={styles.text}>{slide.text}</p>
                  <Button type="button" className={styles.button}>
                    Заказать
                  </Button>
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.image}
                    src={slide.image.src}
                    width={350}
                    height={507}
                    alt={slide.image.alt}
                  />
                  <div className={styles.controls}>
                    <IconButton
                      className={styles.arrow}
                      variant="outline"
                      icon="arrow-left"
                      iconSize={16}
                      iconLabel="Предыдущий слайд."
                      onClick={handlePrevious}
                    />
                    <IconButton
                      className={styles.arrow}
                      variant="outline"
                      icon="arrow-right"
                      iconSize={16}
                      iconLabel="Следующий слайд."
                      onClick={handleNext}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { Promo }
