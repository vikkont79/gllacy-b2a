import Image from "next/image";
import { Button } from "@/shared/ui";

import raspberryGift from "@/shared/assets/images/gifts/raspberry.png";
import marshmellowGift from "@/shared/assets/images/gifts/marshmellow.png";

import styles from "./Gifts.module.css";

const Gifts = () => {
  return (
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

  );
};

export { Gifts };
