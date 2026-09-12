import Image from 'next/image'
import { Icon, Link } from '@/shared/ui'

import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={`${styles.footer} wrapper`}>
      <ul className={`${styles["main-footer__list"]} ${styles.social}`}>
        <li className={styles["social__item"]}>
          {/* href подставим, когда появятся реальные каналы */}
          <Link className={styles["social__link"]} href="#">
            <Icon name="telegram" size={24} />
            <span className="visually-hidden">Мы в Телеграм.</span>
          </Link>
        </li>
        <li className={styles["social__item"]}>
          <Link className={styles["social__link"]} href="#">
            <Icon name="vk" size={24} />
            <span className="visually-hidden">Мы в ВКонтакте.</span>
          </Link>
        </li>
      </ul>

      <ul className={`${styles["main-footer__list"]} ${styles["footer-nav"]}`}>
        <li className={styles["footer-nav__item"]}>
          {/* Страница оферты/политики — обязательна для приёма платежей */}
          <Link className={styles["footer-nav__link"]} href="#">
            Наши документы
          </Link>
        </li>
      </ul>

      <div className={`${styles["main-footer__list"]} ${styles.copyright}`}>
        <p className={styles["copyright__text"]}>
          Сделано выпускником{" "}
          <Link href="https://htmlacademy.ru/" className={styles.copyrightLink}>
            <Image
              className={styles["copyright__img"]}
              src="/icons/logo_htmlacademy.svg"
              width={93}
              height={27}
              alt="Логотип HTML Academy."
            />
          </Link>
        </p>
      </div>
      <p className={styles["copyright__text"]}>© Глейси, 2026</p>
    </footer>
  )
}

export { Footer }
