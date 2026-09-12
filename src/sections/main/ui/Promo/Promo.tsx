'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button, IconButton } from '@/shared/ui'
import icecreamStrawberryCurrent from '@/shared/assets/images/promo/icecream-strawberry.png'
import icecreamBananaCurrent from '@/shared/assets/images/promo/icecream-banana.png'
import icecreamCaramelCurrent from '@/shared/assets/images/promo/icecream-caramel.png'
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

    // Лента: [последний, ...все, первый]. Позиция = реальный индекс + 1 буфер слева.
    // При выезде на буферную копию мгновенно перепрыгиваем на настоящий слайд,
    // чтобы свайп не упирался в края ленты и всегда крутился по кругу.
    const index = Math.round(track.scrollLeft / track.clientWidth)
    const real = index - 1

    if (real === -1) {
      // Буфер слева — дубль последнего слайда: прыгаем на настоящий последний.
      track.scrollLeft = slideCount * track.clientWidth
      setActiveIndex(slideCount - 1)
      return
    }

    if (real === slideCount) {
      // Буфер справа — дубль первого слайда: прыгаем на настоящий первый.
      track.scrollLeft = 1 * track.clientWidth
      setActiveIndex(0)
      return
    }

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
      <ul
        className={styles.promoList}
        ref={trackRef}
        onScroll={handleScroll}
        role="group"
        aria-roledescription="Карусель"
        aria-label="Промо-слайды"
      >
        {looped.map((slide, index) => {
          // Реальный индекс слайда с учётом буферных копий по краям ленты.
          // Стрелки рендерим только у активного слайда, чтобы absolute-кнопки
          // скрытых слайдов не проступали через соседние.
          const isBuffer = index === 0 || index === slideCount + 1
          const real = (index - 1 + slideCount) % slideCount
          const isActive = real === activeIndex
          const isHidden = isBuffer || !isActive

          return (
            <li
              key={index}
              className={styles.promoItem}
              aria-hidden={isHidden}
              inert={isHidden}
            >
              <div className={styles.icecreamBlock}>
                <div className={styles.description}>
                  <h3 className={`${styles.title} title`}>{slide.title}</h3>
                  <p className={styles.text}>{slide.text}</p>
                  <Button>
                    Заказать
                  </Button>
                </div>
                <Image
                  className={styles.image}
                  src={slide.image.src}
                  width={350}
                  height={507}
                  alt={slide.image.alt}
                />
                {isActive && (
                  <>
                    <IconButton
                      className={`${styles.arrow} ${styles.arrowPrev}`}
                      variant="outline"
                      icon="arrow-left"
                      iconSize={16}
                      iconLabel="Предыдущий слайд."
                      onClick={handlePrevious}
                    />
                    <IconButton
                      className={`${styles.arrow} ${styles.arrowNext}`}
                      variant="outline"
                      icon="arrow-right"
                      iconSize={16}
                      iconLabel="Следующий слайд."
                      onClick={handleNext}
                    />
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export { Promo }
