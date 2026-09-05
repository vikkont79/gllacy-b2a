import Image from 'next/image'
import { IconButton } from '@/shared/ui'
import raspberryTasteImg from '@/shared/assets/images/products/raspberry-taste.png'
import pistacioTasteImg from '@/shared/assets/images/products/pistacio-taste.png'
import blueberryTasteImg from '@/shared/assets/images/products/blueberry-taste.png'
import bubblegumTasteImg from '@/shared/assets/images/products/bubblegum-taste.png'
import styles from './Tastes.module.css'

const tastes = [
  {
    img: raspberryTasteImg,
    alt: 'Шарик мороженого вкус малина.',
    title: 'Малинка',
    description: (
      <>
        Сливочное мороженое
        <br /> с малиновым джемом
      </>
    ),
    price: '310',
  },
  {
    img: pistacioTasteImg,
    alt: 'Шарик мороженого вкус фисташка.',
    title: 'Фисташка',
    description: (
      <>
        Фисташковый пломбир
        <br /> с кусочками шоколада
      </>
    ),
    price: '340',
  },
  {
    img: blueberryTasteImg,
    alt: 'Шарик мороженого вкус черника.',
    title: 'Черника',
    description: (
      <>
        Крем-брюле
        <br /> с черничным джемом
      </>
    ),
    price: '330',
  },
  {
    img: bubblegumTasteImg,
    alt: 'Шарик мороженого вкус баблгам.',
    title: 'Бабл-гам',
    description: (
      <>
        Ванильный пломбир
        <br /> со сладкой посыпкой
      </>
    ),
    price: '320',
  },
]

const Tastes = () => {
  return (
    <section className={styles.tastes}>
      <h2 className="visually-hidden">Наши лучшие вкусы.</h2>
      <p className={`${styles.title} title`}>
        Попробуйте самые популярные вкусы нашего мороженого
      </p>
      <ul className={styles.list}>
        {tastes.map((taste) => (
          <li key={taste.title} className={styles.item}>
            <article className={styles.taste}>
              <Image
                className={styles.img}
                src={taste.img}
                width={168}
                height={168}
                alt={taste.alt}
              />
              <h3 className={styles.cardTitle}>{taste.title}</h3>
              <p className={styles.description}>
                {taste.description}
              </p>
              <div className={styles.purchase}>
                <p className={styles.price}>{taste.price} ₽/кг</p>
                <IconButton
                  className={styles.button}
                  icon="cart"
                  iconSize={16}
                  iconLabel="Корзина."
                  variant="secondary"
                />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { Tastes }
