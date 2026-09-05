import Image from 'next/image'
import { Icon, IconButton, Link } from '@/shared/ui'
import logo from '@/shared/assets/images/logo.svg'
import styles from './Header.module.css'

const catalogItems = [
  { title: 'Новинки', href: '/catalog', isNew: true },
  { title: 'Сливочное', href: '/catalog' },
  { title: 'Щербеты', href: '/catalog' },
  { title: 'Фруктовый лед', href: '/catalog' },
  { title: 'Мелорин', href: '/catalog' },
]

const Header = () => {
  return (
    <header className={`${styles.header} wrapper`}>
      <Link href="/" className={styles.logo}>
        <Image
          className={styles.logoImg}
          src={logo}
          width={137}
          height={56}
          alt="Логотип магазина Глейси."
        />
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <details className={styles.catalog}>
              <summary className={styles.navLink}>
                Каталог
                <Icon
                    name="arrow-down"
                    size={16}
                    className={styles.catalogIcon}
                  />
                </summary>
                <ul className={styles.catalogList}>
                  {catalogItems.map((item) => (
                    <li
                      key={item.title}
                      className={`${styles.catalogItem}${
                        item.isNew ? ` ${styles.catalogItemNew}` : ''
                      }`}
                    >
                      <Link href={item.href} className={styles.catalogLink}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link href='/#about' className={styles.navLink}>
                О компании
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.actions}>
          <Link href='tel:+78005558628' className={styles.phone}>
            +7 800 555-86-28
          </Link>
          {/* Заглушка: станет открывашкой модалки с формой поиска */}
            <IconButton
              className={`${styles.actionsButton} ${styles.search}`}
              variant='transparent'
              icon='search'
              iconSize={16}
              iconLabel='Поиск по сайту'
          />
          {/* Заглушка: станет открывашкой модалки регистрации при реализации Auth.js */}
          <IconButton
            className={styles.actionsButton}
            variant='transparent'
            icon='login'
            iconSize={16}
          >
            Вход
          </IconButton>
          {/* Заглушка: счётчик и поповер появятся вместе с features/cart */}
          <IconButton
            className={styles.actionsButton}
            variant='transparent'
            icon='cart'
            iconSize={16}
          >
            Корзина
          </IconButton>
        </div>
    </header>
  )
}

export { Header }
