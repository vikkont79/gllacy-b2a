import Image from "next/image";
import { Button, IconButton, Icon, Link } from "@/shared/ui";

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
                  <Button type="button" className={styles["icecream__button"]}>
                    Заказать
                  </Button>
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
                  <Button type="button" className={styles["icecream__button"]}>
                    Заказать
                  </Button>
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
                  <Button type="button" className={styles["icecream__button"]}>
                    Заказать
                  </Button>
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
            <IconButton
              className={styles["promo__button"]}
              variant="outline"
              icon="arrow-left"
              iconSize={16}
              iconLabel="Предыдущий слайд."
            />
            <IconButton
              className={styles["promo__button"]}
              variant="outline"
              icon="arrow-right"
              iconSize={16}
              iconLabel="Следующий слайд."
            />
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
                <Link
                  className={styles["social__link"]}
                  href="https://t.me/htmlacademy"
                >
                  <Icon name="telegram" size={24} />
                  <span className="visually-hidden">Мы в Телеграм.</span>
                </Link>
              </li>
              <li className={styles["social__item"]}>
                <Link
                  className={styles["social__link"]}
                  href="https://vk.com/htmlacademy"
                >
                  <Icon name="vk" size={24} />
                  <span className="visually-hidden">Мы в ВКонтакте.</span>
                </Link>
              </li>
              <li className={styles["social__item"]}>
                <Link className={styles["social__link"]} href="#">
                  <Icon name="youtube" size={24} />
                  <span className="visually-hidden">Мы в Ютуб.</span>
                </Link>
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
                <Button type="button" className={styles["gifts__button"]}>
                  Хочу подарок
                </Button>
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
                <Button type="button" className={styles["gifts__button"]}>
                  Хочу подарок
                </Button>
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
                    <IconButton
                      className={styles["taste__button"]}
                      icon="cart"
                      iconSize={16}
                      iconLabel="Корзина."
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.about} id="about">
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
            <Link className={styles["news__link"]} href="#">
              <p className={styles["news__text"]}>
                10 способов сервировки фруктовых щербетов
                <br /> к столу
              </p>
            </Link>
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
                <Button
                  type="submit"
                  variant="secondary"
                  className={styles["subscribe__button"]}
                >
                  Отправить
                </Button>
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
                    <IconButton
                      className={styles["delivery-form__tooltip"]}
                      icon="tooltip"
                      iconSize={14}
                      iconLabel="Посмотреть дополнительную информацию."
                    />
                    <span className={styles["delivery-form__tooltip-info"]}>
                      Введите дату доставки
                    </span>
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
                    <IconButton
                      className={styles["delivery-form__tooltip"]}
                      icon="tooltip"
                      iconSize={14}
                      iconLabel="Посмотреть дополнительную информацию."
                    />
                    <span className={styles["delivery-form__tooltip-info"]}>
                      Введите название улицы, дома и квартиры
                    </span>
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
                <Button
                  type="submit"
                  variant="secondary"
                  className={styles["delivery__button"]}
                >
                  Отправить
                </Button>
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
              <Link
                className={styles["contacts__phone"]}
                href="tel:+78128121212"
              >
                +7 (812) 812-12-12
              </Link>
              <p
                className={`${styles["contacts__text"]} ${styles["contacts__text--time"]}`}
              >
                (с 10 до 20 ежедневно)
              </p>
            </address>
            <Button
              type="button"
              variant="secondary"
              className={styles["contacts__button"]}
            >
              Форма обратной связи
            </Button>
          </div>
        </section>
      </main>


  );
};

export { MainPage };
