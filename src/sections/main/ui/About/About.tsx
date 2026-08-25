import styles from "./About.module.css";

const About = () => {
  return (
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

  );
};

export { About };
