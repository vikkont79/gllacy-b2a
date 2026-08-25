import Image from "next/image";
import { Icon, IconButton, Link } from "@/shared/ui";

import logo from "@/shared/assets/images/logo.svg";

import styles from "./Header.module.css";

const catalogItems = [
  { title: "Новинки", href: "/catalog", isNew: true },
  { title: "Сливочное", href: "/catalog" },
  { title: "Щербеты", href: "/catalog" },
  { title: "Фруктовый лед", href: "/catalog" },
  { title: "Мелорин", href: "/catalog" },
];

const Header = () => {
  return (
    <header className={styles["main-header"]}>
      <nav className={styles.nav}>
        <div className={styles["site-nav"]}>
          <Link href="/" className={styles.logo}>
            <Image
              className={styles["logo__img"]}
              src={logo}
              width={137}
              height={56}
              alt="Логотип магазина Глейси."
            />
          </Link>
          <ul className={styles["site-nav__list"]}>
            <li className={styles["site-nav__item"]}>
              <details className={styles.catalog}>
                <summary className={styles.summary}>
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
                        item.isNew ? ` ${styles.catalogItemNew}` : ""
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
            <li className={styles["site-nav__item"]}>
              <Link href="/#about" className={styles["site-nav__link"]}>
                О компании
              </Link>
            </li>
          </ul>
          <form role="search">
            <label className="visually-hidden" htmlFor="site-search">
              Поиск по сайту.
            </label>
            {/* Функционал поиска появится позже (см. docs/roadmap.md, этап 6) */}
            <input
              className={`${styles.search} input`}
              type="search"
              name="q"
              id="site-search"
              placeholder="Поиск по сайту"
            />
          </form>
        </div>
        <div className={styles["user-nav"]}>
          <Link href="tel:+78005558628" className={styles["user-nav__phone"]}>
            +7 800 555-86-28
          </Link>
          <ul className={styles["user-nav__list"]}>
            <li className={styles["user-nav__item"]}>
              {/* Заглушка: станет ссылкой на /login при реализации Auth.js */}
              <IconButton
                className={styles["user-nav__button"]}
                icon="login"
                iconSize={16}
              >
                Вход
              </IconButton>
            </li>
            <li className={styles["user-nav__item"]}>
              {/* Заглушка: счётчик и поповер появятся вместе с features/cart */}
              <IconButton
                className={styles["user-nav__button"]}
                icon="cart"
                iconSize={16}
                aria-label="Корзина."
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export { Header };
