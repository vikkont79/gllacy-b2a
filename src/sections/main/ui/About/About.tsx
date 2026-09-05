import { Icon } from '@/shared/ui'
import styles from './About.module.css'

const About = () => {
  return (
      <section className={styles.about} id="about">
          <div className={styles.wrapper}>
            <h2 className="visually-hidden">Информация о нас.</h2>
            <p className={`${styles.title} title`}>
              Магазин Глейси – это онлайн-магазин по продаже мороженого
              собственного производства
            </p>
            <ul className={styles.list}>
              <li
                className={styles.item}
              >
                <Icon
                  className={styles.icon}
                  name='ice-cream'
                />
                <p className={styles.text}>
                  Всё наше мороженое изготавливается на собственном производстве
                  с использованием современного оборудования и проверенных
                  временем технологий.
                </p>
              </li>
              <li
                className={`${styles.item} ${styles.cow}`}
              >
                <Icon
                  className={styles.icon}
                  name='cow'
                />
                <p className={styles.text}>
                  Закупка ингредиентов производится только
                  <br /> у проверенных фермерских хозяйств, с которыми
                  <br /> нас связывает долговременное сотрудничество.
                </p>
              </li>
              <li
                className={`${styles.item} ${styles.leaf}`}
              >
                <Icon
                  className={styles.icon}
                  name='leaf'
                />
                <p className={styles.text}>
                  Для приготовления мороженого используются сливки и молоко
                  высочайшего качества. Все ингредиенты
                  <br /> и добавки произведены из натурального сырья.
                </p>
              </li>
              <li
                className={`${styles.item} ${styles.thermometer}`}
              >
                <Icon
                  className={styles.icon}
                  name='thermometer'
                />
                <p className={styles.text}>
                  Доставка нашего мороженого осуществляется в специальном
                  термопаке, который не даёт мороженому растаять и позволяет
                  сохранить превосходный вкус.
                </p>
              </li>
            </ul>
          </div>
        </section>

  )
}

export { About }
