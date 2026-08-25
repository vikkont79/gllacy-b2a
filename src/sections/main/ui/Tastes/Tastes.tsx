import Image from "next/image";
import { IconButton } from "@/shared/ui";

import raspberryTasteImg from "@/shared/assets/images/products/raspberry-taste.png";
import pistacioTasteImg from "@/shared/assets/images/products/pistacio-taste.png";
import blueberryTasteImg from "@/shared/assets/images/products/blueberry-taste.png";
import bubblegumTasteImg from "@/shared/assets/images/products/bubblegum-taste.png";

import styles from "./Tastes.module.css";

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

const Tastes = () => {
  return (
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

  );
};

export { Tastes };
