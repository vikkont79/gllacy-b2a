import Image from "next/image";

import logo from "@/shared/assets/images/logo.svg";
import icecreamStrawberry from "@/shared/assets/images/promo/icecream-strawberry.png";
import icecreamStrawberryCurrent from "@/shared/assets/images/promo/icecream-strawberry-current.png";
import icecreamBanana from "@/shared/assets/images/promo/icecream-banana.png";
import icecreamBananaCurrent from "@/shared/assets/images/promo/icecream-banana-current.png";
import icecreamCaramel from "@/shared/assets/images/promo/icecream-caramel.png";
import icecreamCaramelCurrent from "@/shared/assets/images/promo/icecream-caramel-current.png";
import raspberryGift from "@/shared/assets/images/gifts/raspberry.png";
import marshmellowGift from "@/shared/assets/images/gifts/marshmellow.png";
import raspberryTasteImg from "@/shared/assets/images/products/raspberry-taste.png";
import pistacioTasteImg from "@/shared/assets/images/products/pistacio-taste.png";
import blueberryTasteImg from "@/shared/assets/images/products/blueberry-taste.png";
import bubblegumTasteImg from "@/shared/assets/images/products/bubblegum-taste.png";

import styles from "./Main.module.css";

const tastes = [
  {
    img: raspberryTasteImg,
    alt: "Шарик мороженого вкус малина.",
    title: "Малинка",
    description: <>Сливочное мороженое с малиновым джемом</>,
    price: "310 ₽/кг",
  },
  {
    img: pistacioTasteImg,
    alt: "Шарик мороженого вкус фисташка.",
    title: "Фисташка",
    description: <>Фисташковый пломбир с кусочками шоколада</>,
    price: "340 ₽/кг",
  },
  {
    img: blueberryTasteImg,
    alt: "Шарик мороженого вкус черника.",
    title: "Черника",
    description: (
      <>
        Крем-брюле
        <br /> с черничным джемом
      </>
    ),
    price: "330 ₽/кг",
  },
  {
    img: bubblegumTasteImg,
    alt: "Шарик мороженого вкус баблгам.",
    title: "Бабл-гам",
    description: (
      <>
        Ванильный пломбир
        <br /> со сладкой посыпкой
      </>
    ),
    price: "320 ₽/кг",
  },
];

const MainPage = () => {
  return (
    <div className={styles["page__body"]}>
      <header className={styles["main-header"]}>
        <nav className={`${styles["main-header__nav"]} ${styles["main-nav"]}`}>
          <div className={`${styles["main-nav__list"]} ${styles["site-nav"]}`}>
            <a className={`${styles["site-nav__logo"]} ${styles.logo}`} href="#">
              <Image
                className={styles["logo__img"]}
                src={logo}
                width={137}
                height={56}
                alt="Логотип магазина Глейси."
              />
            </a>
            <ul className={styles["site-nav__list"]}>
              <li
                className={`${styles["site-nav__item"]} ${styles["header-catalog"]}`}
              >
                <button className={styles["site-nav__button"]} type="button">
                  Каталог
                  <svg
                    className={styles["site-nav__icon"]}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.80799 6.19526C3.54764 5.93491 3.12553 5.93491 2.86518 6.19526C2.60483 6.45561 2.60483 6.87772 2.86518 7.13807L7.52553 11.7984C7.52759 11.8005 7.52967 11.8026 7.53177 11.8047C7.66246 11.9354 7.83392 12.0005 8.00521 12C8.17518 11.9995 8.34498 11.9344 8.47466 11.8047C8.47675 11.8027 8.47881 11.8006 8.48087 11.7985L13.1412 7.13807C13.4016 6.87772 13.4016 6.45561 13.1412 6.19526C12.8809 5.93491 12.4588 5.93491 12.1984 6.19526L8.00321 10.3905L3.80799 6.19526Z"
                    />
                  </svg>
                </button>
                <ul className={styles["header-catalog__list"]}>
                  <li
                    className={`${styles["header-catalog__item"]} ${styles["header-catalog__item--new"]}`}
                  >
                    <a className={styles["header-catalog__link"]} href="#">
                      Новинки
                    </a>
                  </li>
                  <li className={styles["header-catalog__item"]}>
                    <a className={styles["header-catalog__link"]} href="#">
                      Сливочное
                    </a>
                  </li>
                  <li className={styles["header-catalog__item"]}>
                    <a className={styles["header-catalog__link"]} href="#">
                      Щербеты
                    </a>
                  </li>
                  <li className={styles["header-catalog__item"]}>
                    <a className={styles["header-catalog__link"]} href="#">
                      Фруктовый лед
                    </a>
                  </li>
                  <li className={styles["header-catalog__item"]}>
                    <a className={styles["header-catalog__link"]} href="#">
                      Мелорин
                    </a>
                  </li>
                </ul>
              </li>
              <li className={styles["site-nav__item"]}>
                <a className={styles["site-nav__link"]} href="#">
                  Доставка и оплата
                </a>
              </li>
              <li className={styles["site-nav__item"]}>
                <a className={styles["site-nav__link"]} href="#">
                  О компании
                </a>
              </li>
            </ul>
          </div>
          <div className={`${styles["main-nav__list"]} ${styles["user-nav"]}`}>
            <a className={styles["user-nav__phone"]} href="tel:+78005558628">
              +7 800 555-86-28
            </a>
            <ul className={styles["user-nav__list"]}>
              <li
                className={`${styles["user-nav__item"]} ${styles["user-nav__item--seach"]}`}
              >
                <button className={styles["user-nav__button"]} type="button">
                  <svg
                    className={styles["user-nav__icon"]}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.66341 7.33008C2.66341 4.75275 4.75275 2.66341 7.33008 2.66341C9.90741 2.66341 11.9967 4.75275 11.9967 7.33008C11.9967 8.58735 11.4995 9.7285 10.691 10.5676C10.6682 10.5852 10.6462 10.6044 10.6253 10.6253C10.6044 10.6463 10.5852 10.6682 10.5676 10.6911C9.72847 11.4996 8.58734 11.9967 7.33008 11.9967C4.75275 11.9967 2.66341 9.90741 2.66341 7.33008ZM11.0752 12.018C10.0487 12.8391 8.74675 13.3301 7.33008 13.3301C4.01637 13.3301 1.33008 10.6438 1.33008 7.33008C1.33008 4.01637 1.33008 1.33008 7.33008 1.33008C10.6438 1.33008 13.3301 4.01637 13.3301 7.33008C13.3301 8.74676 12.8391 10.0488 12.018 11.0752L14.4681 13.5253C14.7285 13.7857 14.7285 14.2078 14.4681 14.4682C14.2078 14.7285 13.7857 14.7285 13.5253 14.4682L11.0752 12.018Z"
                    />
                  </svg>
                  <span className="visually-hidden">Поиск.</span>
                </button>
                <div
                  className={`${styles.popover} ${styles["popover-search"]}`}
                >
                  <div className={styles["popover__content"]}>
                    <h2 className="visually-hidden">Поиск по сайту.</h2>
                    <form
                      className={styles["popover-search__form"]}
                      action="https://echo.htmlacademy.ru/"
                      method="post"
                    >
                      <label className="visually-hidden" htmlFor="site-search">
                        Поиск по сайту.
                      </label>
                      <input
                        className={`${styles["popover-search__input"]} ${styles.input}`}
                        type="search"
                        name="site-search"
                        id="site-search"
                        placeholder="Поиск по сайту"
                        required
                      />
                    </form>
                  </div>
                </div>
              </li>
              <li
                className={`${styles["user-nav__item"]} ${styles["user-nav__item--login"]}`}
              >
                <button className={styles["user-nav__button"]} type="button">
                  <svg
                    className={styles["user-nav__icon"]}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 1.66667C9 1.29848 9.29848 1 9.66667 1H12.3333C12.8638 1 13.3725 1.21071 13.7475 1.58579C14.1226 1.96086 14.3333 2.46957 14.3333 3V12.3333C14.3333 12.8638 14.1226 13.3725 13.7475 13.7475C13.3725 14.1226 12.8638 14.3333 12.3333 14.3333H9.66667C9.29848 14.3333 9 14.0349 9 13.6667C9 13.2985 9.29848 13 9.66667 13H12.3333C12.5101 13 12.6797 12.9298 12.8047 12.8047C12.9298 12.6797 13 12.5101 13 12.3333V3C13 2.82319 12.9298 2.65362 12.8047 2.5286C12.6797 2.40357 12.5101 2.33333 12.3333 2.33333H9.66667C9.29848 2.33333 9 2.03486 9 1.66667ZM5.86189 3.86193C6.12224 3.60158 6.54435 3.60158 6.8047 3.86193L10.1338 7.19103C10.1509 7.20785 10.1671 7.22559 10.1824 7.24416C10.2142 7.28296 10.2411 7.32451 10.2628 7.36795C10.3079 7.45781 10.3333 7.55927 10.3333 7.66667C10.3333 7.77529 10.3074 7.87785 10.2613 7.96846C10.241 8.00841 10.2164 8.04675 10.1876 8.08278C10.1708 8.10378 10.1527 8.12375 10.1335 8.14256L6.8047 11.4714C6.54435 11.7318 6.12224 11.7318 5.86189 11.4714C5.60154 11.2111 5.60154 10.7889 5.86189 10.5286L8.05715 8.33333H1.66667C1.29848 8.33333 1 8.03486 1 7.66667C1 7.29848 1.29848 7 1.66667 7H8.05715L5.86189 4.80474C5.60154 4.54439 5.60154 4.12228 5.86189 3.86193Z"
                    />
                  </svg>
                  Вход
                </button>
                <div
                  className={`${styles.popover} ${styles["popover-login"]}`}
                >
                  <div className={styles["popover__content"]}>
                    <h2 className={styles["popover__title"]}>
                      Личный кабинет
                    </h2>
                    <form
                      className={styles["popover-login__form"]}
                      action="https://echo.htmlacademy.ru/"
                      method="post"
                    >
                      <label
                        className="visually-hidden"
                        htmlFor="popover-login-email"
                      >
                        Email.
                      </label>
                      <input
                        className={`${styles["popover-login__input"]} ${styles.input}`}
                        type="email"
                        name="popover-login-email"
                        id="popover-login-email"
                        placeholder="email@example.com"
                        required
                      />
                      <label
                        className="visually-hidden"
                        htmlFor="popover-login-password"
                      >
                        Пароль.
                      </label>
                      <input
                        className={`${styles["popover-login__input"]} ${styles.input}`}
                        type="password"
                        name="popover-login-password"
                        id="popover-login-password"
                        placeholder="******"
                        required
                        disabled
                      />
                    </form>
                    <div
                      className={styles["popover-login__signin-block"]}
                    >
                      <button
                        className={`${styles["popover-login__button"]} ${styles.button} ${styles["button--dark"]}`}
                        type="submit"
                      >
                        Войти
                      </button>
                      <div className={styles["popover-login__signin-info"]}>
                        <a className={styles["popover-login__link"]} href="#">
                          Забыли пароль?
                        </a>
                        <a className={styles["popover-login__link"]} href="#">
                          Регистрация
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li
                className={`${styles["user-nav__item"]} ${styles["user-nav__item--cart"]}`}
              >
                <button className={styles["user-nav__button"]} type="button">
                  <svg
                    className={styles["user-nav__icon"]}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.16667 1.25C0.798477 1.25 0.5 1.54848 0.5 1.91667C0.5 2.28486 0.798477 2.58333 1.16667 2.58333H2.93794L3.40537 4.91872C3.40821 4.93667 3.41176 4.95438 3.416 4.97182L4.38338 9.80515L4.3835 9.80571C4.46706 10.2257 4.69562 10.603 5.02921 10.8715C5.36111 11.1387 5.77595 11.2813 6.20183 11.2748H11.8225C12.2484 11.2813 12.6633 11.1387 12.9952 10.8715C13.3289 10.6029 13.5575 10.2254 13.641 9.80515L13.641 9.80515L13.642 9.80016L14.5691 4.93872C14.6063 4.74355 14.5545 4.54195 14.4279 4.38887C14.3012 4.23578 14.1129 4.14716 13.9142 4.14716H4.61072L4.1381 1.78583C4.07574 1.47426 3.80215 1.25 3.4844 1.25H1.16667ZM5.69098 9.54444L4.87759 5.4805H13.1084L12.3328 9.54736C12.31 9.65988 12.2485 9.7609 12.1591 9.83291C12.0691 9.90535 11.9565 9.94383 11.841 9.94162L11.841 9.94149H11.8282H6.19614V9.94137L6.18337 9.94162C6.06787 9.94383 5.95528 9.90535 5.8653 9.83291C5.77531 9.76048 5.71368 9.6587 5.69117 9.5454L5.69098 9.54444ZM4.55739 13.5054C4.55739 12.8175 5.1151 12.2597 5.80307 12.2597C6.49105 12.2597 7.04876 12.8175 7.04876 13.5054C7.04876 14.1934 6.49105 14.7511 5.80307 14.7511C5.1151 14.7511 4.55739 14.1934 4.55739 13.5054ZM10.9307 13.5054C10.9307 12.8175 11.4884 12.2597 12.1764 12.2597C12.8644 12.2597 13.4221 12.8175 13.4221 13.5054C13.4221 14.1934 12.8644 14.7511 12.1764 14.7511C11.4884 14.7511 10.9307 14.1934 10.9307 13.5054Z"
                    />
                  </svg>
                  <span className="visually-hidden">Корзина.</span>
                  2 товара
                </button>
                <div className={`${styles.popover} ${styles["popover-cart"]}`}>
                  <div className={styles["popover__content"]}>
                    <h2 className={styles["popover__title"]}>Корзина</h2>
                    <ul className={styles["popover-cart__list"]}>
                      <li
                        className={`${styles["popover-cart__item"]} ${styles["cart-product"]}`}
                      >
                        <div className={styles["cart-product__item"]}>
                          <Image
                            className={styles["cart-product__img"]}
                            src={raspberryTasteImg}
                            width={46}
                            height={46}
                            alt="Шарик мороженого вкус малина."
                          />
                          <div className={styles["cart-product__description"]}>
                            <p className={styles["cart-product__title"]}>
                              Малинка
                            </p>
                            <p className={styles["cart-product__base-price"]}>
                              1 кг х 310 ₽
                            </p>
                          </div>
                        </div>
                        <p className={styles["cart-product__total-price"]}>
                          310 ₽
                        </p>
                        <button className={styles["cart-product__cross-button"]}>
                          <span className="visually-hidden">
                            Удалить из корзины.
                          </span>
                        </button>
                      </li>
                      <li
                        className={`${styles["popover-cart__item"]} ${styles["cart-product"]}`}
                      >
                        <div className={styles["cart-product__item"]}>
                          <Image
                            className={styles["cart-product__img"]}
                            src={bubblegumTasteImg}
                            width={46}
                            height={46}
                            alt="Шарик мороженого вкус баблгам."
                          />
                          <div className={styles["cart-product__description"]}>
                            <p className={styles["cart-product__title"]}>
                              Бабл-гам
                            </p>
                            <p className={styles["cart-product__base-price"]}>
                              1 кг х 480 ₽
                            </p>
                          </div>
                        </div>
                        <p className={styles["cart-product__total-price"]}>
                          480 ₽
                        </p>
                        <button className={styles["cart-product__cross-button"]}>
                          <span className="visually-hidden">
                            Удалить из корзины.
                          </span>
                        </button>
                      </li>
                    </ul>
                    <div className={styles["popover-cart__buy-block"]}>
                      <button
                        className={`${styles["popover-cart__button"]} ${styles.button} ${styles["button--dark"]}`}
                        type="button"
                      >
                        Оформить заказ
                      </button>
                      <p className={styles["popover-cart__price"]}>
                        Итого: 790 ₽
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className={`${styles["main-index"]} ${styles.wrapper}`}>
        <h1 className="visually-hidden">Магазин мороженого Глейси.</h1>

        <section className={`${styles.promo} ${styles.slider}`}>
          <h2 className="visually-hidden">Наши лучшие товары.</h2>
          <ul className={`${styles["promo__list"]} ${styles["slider__list"]}`}>
            <li
              className={`${styles["promo__item"]} ${styles["slider__item"]} ${styles.icecream} ${styles["slider__item--current"]}`}
            >
              <div
                className={`${styles["icecream__block"]} ${styles["icecream__block--strawberry"]}`}
              >
                <div className={styles["icecream__description"]}>
                  <h3 className={styles["icecream__title"]}>
                    Нежный пломбир
                    <br /> с клубничным джемом
                  </h3>
                  <p className={styles["icecream__text"]}>
                    Натуральное мороженое из свежих сливок
                    <br /> и молока с вкуснейшим клубничным джемом – это
                    идеальный десерт для всей семьи.
                  </p>
                  <button
                    className={`${styles["icecream__button"]} ${styles.button}`}
                    type="button"
                  >
                    Заказать
                  </button>
                </div>
                <ul
                  className={`${styles["icecream__slide-show"]} ${styles["slide-show"]}`}
                >
                  <li
                    className={`${styles["slide-show__item"]} ${styles.slide} ${styles["slide--current"]}`}
                  >
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamStrawberryCurrent}
                      width={327}
                      height={507}
                      alt="Клубничный рожок."
                    />
                  </li>
                  <li className={`${styles["slide-show__item"]} ${styles.slide}`}>
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamBanana}
                      width={66}
                      height={150}
                      alt="Банановый рожок."
                    />
                  </li>
                  <li className={`${styles["slide-show__item"]} ${styles.slide}`}>
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamCaramel}
                      width={66}
                      height={150}
                      alt="Карамельный рожок."
                    />
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={`${styles["promo__item"]} ${styles["slider__item"]} ${styles.icecream}`}
            >
              <div
                className={`${styles["icecream__block"]} ${styles["icecream__block--banana"]}`}
              >
                <div className={styles["icecream__description"]}>
                  <h3 className={styles["icecream__title"]}>
                    Сливочное мороженое со вкусом банана
                  </h3>
                  <p className={styles["icecream__text"]}>
                    Сливочное мороженое с ярким банановым вкусом подарит вам
                    свежесть и наслаждение даже в самый жаркий летний день.
                  </p>
                  <button
                    className={`${styles["icecream__button"]} ${styles.button}`}
                    type="button"
                  >
                    Заказать
                  </button>
                </div>
                <ul
                  className={`${styles["icecream__slide-show"]} ${styles["slide-show"]}`}
                >
                  <li
                    className={`${styles["slide-show__item"]} ${styles.slide} ${styles["slide--current"]}`}
                  >
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamBananaCurrent}
                      width={312}
                      height={507}
                      alt="Банановый рожок."
                    />
                  </li>
                  <li className={`${styles["slide-show__item"]} ${styles.slide}`}>
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamCaramel}
                      width={66}
                      height={150}
                      alt="Карамельный рожок."
                    />
                  </li>
                  <li className={`${styles["slide-show__item"]} ${styles.slide}`}>
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamStrawberry}
                      width={66}
                      height={150}
                      alt="Клубничный рожок."
                    />
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={`${styles["promo__item"]} ${styles["slider__item"]} ${styles.icecream}`}
            >
              <div
                className={`${styles["icecream__block"]} ${styles["icecream__block--caramel"]}`}
              >
                <div className={styles["icecream__description"]}>
                  <h3 className={styles["icecream__title"]}>
                    Карамельный пломбир с маршмеллоу
                  </h3>
                  <p className={styles["icecream__text"]}>
                    Необычный сладкий десерт с карамельным топпингом и кусочками
                    зефира завоюет сердца сладкоежек всех возрастов.
                  </p>
                  <button
                    className={`${styles["icecream__button"]} ${styles.button}`}
                    type="button"
                  >
                    Заказать
                  </button>
                </div>
                <ul
                  className={`${styles["icecream__slide-show"]} ${styles["slide-show"]}`}
                >
                  <li
                    className={`${styles["slide-show__item"]} ${styles.slide} ${styles["slide--current"]}`}
                  >
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamCaramelCurrent}
                      width={350}
                      height={507}
                      alt="Карамельный рожок."
                    />
                  </li>
                  <li className={`${styles["slide-show__item"]} ${styles.slide}`}>
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamStrawberry}
                      width={66}
                      height={150}
                      alt="Клубничный рожок."
                    />
                  </li>
                  <li className={`${styles["slide-show__item"]} ${styles.slide}`}>
                    <Image
                      className={styles["slide__img"]}
                      src={icecreamBanana}
                      width={66}
                      height={150}
                      alt="Банановый рожок."
                    />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div
            className={`${styles["promo__controls"]} ${styles["slider__controls"]}`}
          >
            <button
              className={`${styles["promo__button"]} ${styles["promo__button--prev"]} ${styles["slider__button"]} ${styles["slider__button--prev"]}`}
              type="button"
            >
              <svg
                className={styles["promo__icon"]}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.8033 3.80515C10.063 3.54545 10.063 3.12439 9.8033 2.8647C9.54361 2.605 9.12255 2.605 8.86285 2.8647L4.19477 7.53277C3.93593 7.79162 3.93508 8.21075 4.19221 8.47065C4.19338 8.47183 4.19454 8.47301 4.19572 8.47418L8.8638 13.1423C9.12349 13.402 9.54455 13.402 9.80425 13.1423C10.0639 12.8826 10.0639 12.4615 9.80425 12.2018L5.60545 8.00301L9.8033 3.80515Z"
                />
              </svg>
              <span className="visually-hidden">Предыдущий слайд.</span>
            </button>
            <button
              className={`${styles["promo__button"]} ${styles["promo__button--next"]} ${styles["slider__button"]} ${styles["slider__button--next"]}`}
              type="button"
            >
              <svg
                className={styles["promo__icon"]}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.13526 2.8647C6.87557 2.605 6.45451 2.605 6.19481 2.8647C5.93511 3.12439 5.93511 3.54545 6.19481 3.80515L10.3961 8.00643L6.19477 12.2077C5.93508 12.4674 5.93508 12.8885 6.19477 13.1482C6.45447 13.4079 6.87553 13.4079 7.13523 13.1482L11.804 8.47944C11.8049 8.47852 11.8058 8.47759 11.8068 8.47666C12.0665 8.21696 12.0665 7.79591 11.8068 7.53621L7.13526 2.8647Z"
                />
              </svg>
              <span className="visually-hidden">Следующий слайд.</span>
            </button>
          </div>
          <div className={styles["promo__footer"]}>
            <p
              className={`${styles["promo__toggles"]} ${styles["slider__toggles"]}`}
            >
              <button
                className={`${styles["promo__toggle"]} ${styles["promo__toggle--current"]} ${styles["slider__toggle"]} ${styles["slider__toggle--current"]}`}
                type="button"
                id="strawberry"
              >
                <span className="visually-hidden">1.</span>
              </button>
              <button
                className={`${styles["promo__toggle"]} ${styles["slider__toggle"]}`}
                type="button"
                id="banana"
              >
                <span className="visually-hidden">2.</span>
              </button>
              <button
                className={`${styles["promo__toggle"]} ${styles["slider__toggle"]}`}
                type="button"
                id="caramel"
              >
                <span className="visually-hidden">3.</span>
              </button>
            </p>
            <ul className={`${styles["promo__social"]} ${styles.social}`}>
              <li className={styles["social__item"]}>
                <a className={styles["social__link"]} href="https://t.me/htmlacademy">
                  <Image
                    className={styles["social__img"]}
                    src="/icons/telegram.svg"
                    width={24}
                    height={24}
                    alt="Логотип Телеграм."
                  />
                  <span className="visually-hidden">Мы в Телеграм.</span>
                </a>
              </li>
              <li className={styles["social__item"]}>
                <a className={styles["social__link"]} href="https://vk.com/htmlacademy">
                  <Image
                    className={styles["social__img"]}
                    src="/icons/vk.svg"
                    width={24}
                    height={24}
                    alt="Логотип ВКонтакте."
                  />
                  <span className="visually-hidden">Мы в ВКонтакте.</span>
                </a>
              </li>
              <li className={styles["social__item"]}>
                <a className={styles["social__link"]} href="#">
                  <Image
                    className={styles["social__img"]}
                    src="/icons/youtube.svg"
                    width={24}
                    height={24}
                    alt="Логотип Ютуб."
                  />
                  <span className="visually-hidden">Мы в Ютуб.</span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.gifts}>
          <h2 className="visually-hidden">Специальные предложения.</h2>
          <p className={styles["gifts__slogan"]}>
            Заказывайте мороженое и получайте подарки!
          </p>
          <ul className={styles["gifts__list"]}>
            <li className={styles["gifts__item"]}>
              <div className={styles["gifts__description"]}>
                <h3 className={styles["gifts__title"]}>Малинка даром!</h3>
                <p className={styles["gifts__text"]}>
                  При покупке 2 кг любого фруктового мороженого добавим в ваш
                  заказ банку малинового варенья бесплатно.
                </p>
                <button
                  className={`${styles["gifts__button"]} ${styles.button}`}
                  type="button"
                >
                  Хочу подарок
                </button>
              </div>
              <Image
                className={styles["gifts__img"]}
                src={raspberryGift}
                width={219}
                height={268}
                alt="Рожок с малиной."
              />
            </li>
            <li className={styles["gifts__item"]}>
              <div className={styles["gifts__description"]}>
                <h3 className={styles["gifts__title"]}>Маршмеллоу даром!</h3>
                <p className={styles["gifts__text"]}>
                  При покупке 2 кг пломбира добавим
                  <br /> в ваш заказ упаковку нежных зефирок совершенно
                  бесплатно.
                </p>
                <button
                  className={`${styles["gifts__button"]} ${styles.button}`}
                  type="button"
                >
                  Хочу подарок
                </button>
              </div>
              <Image
                className={styles["gifts__img"]}
                src={marshmellowGift}
                width={219}
                height={268}
                alt="Рожок с маршмеллоу."
              />
            </li>
          </ul>
        </section>

        <section className={styles.tastes}>
          <h2 className="visually-hidden">Наши лучшие вкусы.</h2>
          <p className={styles["tastes__slogan"]}>
            Попробуйте самые популярные вкусы нашего мороженого
          </p>
          <ul className={styles["tastes__list"]}>
            {tastes.map((taste) => (
              <li key={taste.title} className={styles["tastes__item"]}>
                <div className={styles["taste__wrapper"]}>
                  <Image
                    className={styles["taste__img"]}
                    src={taste.img}
                    width={168}
                    height={168}
                    alt={taste.alt}
                  />
                  <h3 className={styles["taste__title"]}>{taste.title}</h3>
                  <p className={styles["taste__description"]}>
                    {taste.description}
                  </p>
                  <div className={styles["taste__buy-block"]}>
                    <p className={styles["taste__price"]}>{taste.price}</p>
                    <button className={styles["taste__button"]} type="button">
                      <svg
                        className={styles["taste__icon"]}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.16667 1.25C0.798477 1.25 0.5 1.54848 0.5 1.91667C0.5 2.28486 0.798477 2.58333 1.16667 2.58333H2.93794L3.40537 4.91872C3.40821 4.93667 3.41176 4.95438 3.416 4.97182L4.38338 9.80515L4.3835 9.80571C4.46706 10.2257 4.69562 10.603 5.02921 10.8715C5.36111 11.1387 5.77595 11.2813 6.20183 11.2748H11.8225C12.2484 11.2813 12.6633 11.1387 12.9952 10.8715C13.3289 10.6029 13.5575 10.2254 13.641 9.80515L13.641 9.80515L13.642 9.80016L14.5691 4.93872C14.6063 4.74355 14.5545 4.54195 14.4279 4.38887C14.3012 4.23578 14.1129 4.14716 13.9142 4.14716H4.61072L4.1381 1.78583C4.07574 1.47426 3.80215 1.25 3.4844 1.25H1.16667ZM5.69098 9.54444L4.87759 5.4805H13.1084L12.3328 9.54736C12.31 9.65988 12.2485 9.7609 12.1591 9.83291C12.0691 9.90535 11.9565 9.94383 11.841 9.94162L11.841 9.94149H11.8282H6.19614V9.94137L6.18337 9.94162C6.06787 9.94383 5.95528 9.90535 5.8653 9.83291C5.77531 9.76048 5.71368 9.6587 5.69117 9.5454L5.69098 9.54444ZM4.55739 13.5054C4.55739 12.8175 5.1151 12.2597 5.80307 12.2597C6.49105 12.2597 7.04876 12.8175 7.04876 13.5054C7.04876 14.1934 6.49105 14.7511 5.80307 14.7511C5.1151 14.7511 4.55739 14.1934 4.55739 13.5054ZM10.9307 13.5054C10.9307 12.8175 11.4884 12.2597 12.1764 12.2597C12.8644 12.2597 13.4221 12.8175 13.4221 13.5054C13.4221 14.1934 12.8644 14.7511 12.1764 14.7511C11.4884 14.7511 10.9307 14.1934 10.9307 13.5054Z"
                        />
                      </svg>
                      <span className="visually-hidden">Корзина.</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.about}>
          <div className={styles["about__wrapper"]}>
            <h2 className="visually-hidden">Информация о нас.</h2>
            <p className={styles["about__slogan"]}>
              Магазин Глейси – это онлайн и офлайн-магазин по продаже мороженого
              собственного производства на развес
            </p>
            <ul className={styles["about__list"]}>
              <li
                className={`${styles["about__item"]} ${styles["about__item--ice-cream"]}`}
              >
                <p className={styles["about__text"]}>
                  Всё наше мороженое изготавливается на собственном производстве
                  с использованием современного оборудования и проверенных
                  временем технологий.
                </p>
              </li>
              <li
                className={`${styles["about__item"]} ${styles["about__item--cow"]}`}
              >
                <p className={styles["about__text"]}>
                  Закупка ингредиентов производится только
                  <br /> у проверенных фермерских хозяйств, с которыми
                  <br /> нас связывает долговременное сотрудничество.
                </p>
              </li>
              <li
                className={`${styles["about__item"]} ${styles["about__item--leaf"]}`}
              >
                <p className={styles["about__text"]}>
                  Для приготовления мороженого используются сливки и молоко
                  высочайшего качества. Все ингредиенты
                  <br /> и добавки произведены из натурального сырья.
                </p>
              </li>
              <li
                className={`${styles["about__item"]} ${styles["about__item--thermometer"]}`}
              >
                <p className={styles["about__text"]}>
                  Доставка нашего мороженого осуществляется в специальном
                  термопаке, который не даёт мороженому растаять и позволяет
                  сохранить превосходный вкус.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <div className={styles["main-index__inner"]}>
          <article className={styles.news}>
            <h2 className={styles["news__title"]}>Новое в нашем блоге</h2>
            <a className={styles["news__link"]} href="#">
              <p className={styles["news__text"]}>
                10 способов сервировки фруктовых щербетов
                <br /> к столу
              </p>
            </a>
          </article>
          <section className={styles.subscribe}>
            <h2 className="visually-hidden">Форма подпики на рассылку.</h2>
            <div className={styles["subscribe__wrapper"]}>
              <p className={styles["subscribe__text"]}>
                Подпишитесь на нашу сладкую рассылку и будьте всегда
                <br /> в курсе всего самого вкусного, что у нас происходит.
                Обещаем не спамить и не слать всякой ненужной ерунды. Честно =)
              </p>
              <form
                className={styles["subscribe__form"]}
                action="https://echo.htmlacademy.ru/"
                method="post"
              >
                <label className="visually-hidden" htmlFor="subscribe-email">
                  Email.
                </label>
                <input
                  className={`${styles["subscribe__input"]} ${styles.input}`}
                  type="email"
                  name="subscribe-email"
                  id="subscribe-email"
                  placeholder="email@example.com"
                  required
                />
                <button
                  className={`${styles["subscribe__button"]} ${styles.button} ${styles["button--dark"]}`}
                  type="submit"
                >
                  Отправить
                </button>
              </form>
            </div>
          </section>
        </div>

        <section className={styles.delivery}>
          <h2 className="visually-hidden">Доставка.</h2>
          <div className={styles["delivery__wrapper"]}>
            <div className={styles["delivery__intro"]}>
              <h3 className={styles["delivery__title"]}>
                Доставка любимого мороженого на дом
              </h3>
              <p className={styles["delivery__text"]}>
                Хочется полакомиться любимым десертом,
                <br /> но нет времени съездить в магазин? Закажите доставку
                мороженого на дом, и курьер привезёт вам ваш заказ в течение
                часа!
              </p>
            </div>
            <div className={styles["delivery__info"]}>
              <p className={styles["delivery__info-text"]}>
                Укажите адрес и дату доставки, и мы свяжемся с вами, чтобы
                подтвердить заказ.
              </p>
              <form
                className={`${styles["delivery__form"]} ${styles["delivery-form"]}`}
                action="https://echo.htmlacademy.ru/"
                method="post"
              >
                <p className={styles["delivery-form__group"]}>
                  <span className={styles["delivery-form__label"]}>
                    <label htmlFor="delivery-date">Дата</label>
                    <button className={styles["delivery-form__tooltip"]}>
                      <span className="visually-hidden">
                        Посмотреть дополнительную информацию.
                      </span>
                      <span className={styles["delivery-form__tooltip-info"]}>
                        Введите дату доставки
                      </span>
                    </button>
                  </span>
                  <input
                    className={`${styles["delivery-form__input"]} ${styles.input}`}
                    type="text"
                    name="delivery-date"
                    id="delivery-date"
                    placeholder="01.04.2020"
                    required
                  />
                </p>
                <p className={styles["delivery-form__group"]}>
                  <label
                    className={styles["delivery-form__label"]}
                    htmlFor="delivery-phone"
                  >
                    Телефон
                  </label>
                  <input
                    className={`${styles["delivery-form__input"]} ${styles.input}`}
                    type="text"
                    name="delivery-phone"
                    id="delivery-phone"
                    placeholder="+7 800 999-00-00"
                    required
                  />
                </p>
                <p
                  className={`${styles["delivery-form__group"]} ${styles["delivery-form__group--adress"]}`}
                >
                  <span className={styles["delivery-form__label"]}>
                    <label htmlFor="delivery-adress">Адрес</label>
                    <button className={styles["delivery-form__tooltip"]}>
                      <span className="visually-hidden">
                        Посмотреть дополнительную информацию.
                      </span>
                      <span className={styles["delivery-form__tooltip-info"]}>
                        Введите название улицы, дома и квартиры
                      </span>
                    </button>
                  </span>
                  <input
                    className={`${styles["delivery-form__input"]} ${styles.input}`}
                    type="text"
                    name="delivery-adress"
                    id="delivery-adress"
                    placeholder="ул. Большая Конюшенная, 19/8"
                    required
                  />
                </p>
                <button
                  className={`${styles["delivery__button"]} ${styles.button} ${styles["button--dark"]}`}
                  type="submit"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className={styles.contacts}>
          <h2 className="visually-hidden">Наши контакты.</h2>
          <div className={styles["contacts__wrapper"]}>
            <address className={styles["contacts__adress"]}>
              <p className={styles["contacts__text"]}>
                Адрес главного офиса
                <br /> и офлайн-магазина:
              </p>
              <p
                className={`${styles["contacts__text"]} ${styles["contacts__text--adress"]}`}
              >
                наб. реки Карповки,
                <br /> 5 лит П, Санкт-Петербург
              </p>
              <p className={styles["contacts__text"]}>
                Для заказов по телефону:
              </p>
              <a className={styles["contacts__phone"]} href="tel:+78128121212">
                +7 (812) 812-12-12
              </a>
              <p
                className={`${styles["contacts__text"]} ${styles["contacts__text--time"]}`}
              >
                (с 10 до 20 ежедневно)
              </p>
            </address>
            <button
              className={`${styles["contacts__button"]} ${styles.button} ${styles["button--dark"]}`}
              type="button"
            >
              Форма обратной связи
            </button>
          </div>
        </section>
      </main>

      <footer className={`${styles["main-footer"]} ${styles.wrapper}`}>
        <ul className={`${styles["main-footer__list"]} ${styles.social}`}>
          <li className={styles["social__item"]}>
            <a className={styles["social__link"]} href="https://t.me/htmlacademy">
              <Image
                className={styles["social__img"]}
                src="/icons/telegram.svg"
                width={24}
                height={24}
                alt="Логотип Телеграм."
              />
              <span className="visually-hidden">Мы в Телеграм.</span>
            </a>
          </li>
          <li className={styles["social__item"]}>
            <a className={styles["social__link"]} href="https://vk.com/htmlacademy">
              <Image
                className={styles["social__img"]}
                src="/icons/vk.svg"
                width={24}
                height={24}
                alt="Логотип ВКонтакте."
              />
              <span className="visually-hidden">Мы в ВКонтакте.</span>
            </a>
          </li>
          <li className={styles["social__item"]}>
            <a className={styles["social__link"]} href="#">
              <Image
                className={styles["social__img"]}
                src="/icons/youtube.svg"
                width={24}
                height={24}
                alt="Логотип Ютуб."
              />
              <span className="visually-hidden">Мы в Ютуб.</span>
            </a>
          </li>
        </ul>
        <ul className={`${styles["main-footer__list"]} ${styles["footer-nav"]}`}>
          <li
            className={`${styles["footer-nav__item"]} ${styles["footer-nav__item--heart-fill"]}`}
          >
            <a className={styles["footer-nav__link"]} href="#">
              Для поставщиков
            </a>
          </li>
          <li className={styles["footer-nav__item"]}>
            <a className={styles["footer-nav__link"]} href="#">
              Наши документы
            </a>
          </li>
          <li className={styles["footer-nav__item"]}>
            <a className={styles["footer-nav__link"]} href="#">
              О производстве
            </a>
          </li>
          <li className={styles["footer-nav__item"]}>
            <a className={styles["footer-nav__link"]} href="#">
              Экологические стандарты
            </a>
          </li>
        </ul>
        <div className={`${styles["main-footer__list"]} ${styles.copyright}`}>
          <a className={styles["copyright__link"]} href="https://htmlacademy.ru/">
            <Image
              className={styles["copyright__img"]}
              src="/icons/logo_htmlacademy.svg"
              width={93}
              height={27}
              alt="Логотип HTML Academy."
            />
          </a>
          <p className={styles["copyright__text"]}>
            Сделано в{" "}
            <a className={styles["copyright__text-link"]} href="https://htmlacademy.ru/">
              .html academy
            </a>{" "}
            © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export { MainPage };
