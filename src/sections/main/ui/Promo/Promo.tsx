import Image from "next/image";
import { Button, IconButton } from "@/shared/ui";

import icecreamStrawberry from "@/shared/assets/images/promo/icecream-strawberry.png";
import icecreamStrawberryCurrent from "@/shared/assets/images/promo/icecream-strawberry-current.png";
import icecreamBanana from "@/shared/assets/images/promo/icecream-banana.png";
import icecreamBananaCurrent from "@/shared/assets/images/promo/icecream-banana-current.png";
import icecreamCaramel from "@/shared/assets/images/promo/icecream-caramel.png";
import icecreamCaramelCurrent from "@/shared/assets/images/promo/icecream-caramel-current.png";

import styles from "./Promo.module.css";

const Promo = () => {
  return (
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
          </div>
        </section>

  );
};

export { Promo };
