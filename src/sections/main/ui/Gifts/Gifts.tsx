import Image from 'next/image'
import { Button } from '@/shared/ui'
import raspberryGift from '@/shared/assets/images/gifts/raspberry.png'
import marshmellowGift from '@/shared/assets/images/gifts/marshmellow.png'
import styles from './Gifts.module.css'

const Gifts = () => {
  return (
    <section className={styles.gifts}>
      <h2 className="visually-hidden">Специальные предложения.</h2>
      <p className={`${styles.title} title`}>
        Заказывайте мороженое и получайте подарки!
      </p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.description}>
            <h3 className={styles.cardTitle}>Малинка даром!</h3>
            <p className={styles.text}>
              При покупке 2 кг фруктового мороженого добавим в ваш
              заказ банку малинового варенья бесплатно.
            </p>
            <Button>
              Хочу подарок
            </Button>
          </div>
          <Image
            className={styles.img}
            src={raspberryGift}
            width={219}
            height={268}
            alt="Рожок с малиной."
          />
        </li>
        <li className={styles.item}>
          <div className={styles.description}>
            <h3 className={styles.cardTitle}>Зефирки даром!</h3>
            <p className={styles.text}>
              При покупке 2 кг пломбира добавим
              <br /> в ваш заказ упаковку нежного зефира совершенно
              бесплатно.
            </p>
            <Button>
              Хочу подарок
            </Button>
          </div>
          <Image
            className={styles.img}
            src={marshmellowGift}
            width={219}
            height={268}
            alt="Рожок с маршмеллоу."
          />
        </li>
      </ul>
    </section>
  )
}

export { Gifts }
