import { Button, Link } from '@/shared/ui'
import { CONTACT_PHONE, OPENING_HOURS, phoneHref } from '@/shared/config/contacts'

import styles from './Delivery.module.css'

const formatHour = (time: string): string => time.replace(/:00$/, '')

const Delivery = () => {
  return (
    <section className={styles.delivery}>
      <h2 className="visually-hidden">Доставка.</h2>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={`${styles.title} title`}>
                      Доставка
                      <br /> любимого мороженого
                      <br /> на дом
          </p>
          <p className={styles.text}>
            Хочется полакомиться любимым десертом,
            <br /> но нет времени съездить в магазин? Закажите доставку
            мороженого на дом, и курьер привезёт вам ваш заказ в течение
            часа!
          </p>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <Link href={phoneHref(CONTACT_PHONE.raw)} className={styles.phone}>
              {CONTACT_PHONE.display}
            </Link>
            <p className={styles.cardText}>
              Позвоните нам — мы на связи
              <br /> (с {formatHour(OPENING_HOURS.opens)} до {formatHour(OPENING_HOURS.closes)} ежедневно)
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.cardText}>
              Или закажите звонок — перезвоним и ответим на все вопросы:
            </p>
            {/* Server Action появится на этапе 3 (см. docs/roadmap.md);
                вместе с ним — honeypot и rate limiting */}
            <form className={styles.form}>
              <label className="visually-hidden" htmlFor="callback-phone">
                Телефон.
              </label>
              <input
                id="callback-phone"
                name="phone"
                type="tel"
                placeholder="+7 800 999-00-00"
                required
                className={`input ${styles.field}`}
              />
              <Button type="submit">Позвоните мне</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Delivery }
