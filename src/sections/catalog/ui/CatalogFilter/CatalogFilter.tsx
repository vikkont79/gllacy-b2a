import styles from './CatalogFilter.module.css'

interface CatalogFilterProps {
  className?: string
}

const fatnessOptions = ['0%', 'до 10%', 'до 30%', 'выше 30%']

const fillerOptions = ['шоколадные', 'сахарные посыпки', 'фрукты', 'сиропы', 'джемы']

const CatalogFilter = ({ className = '' }: CatalogFilterProps) => {
  return (
    <form className={`${styles.filter} ${className || ''}`.trim()} action="#" method="post">
      <fieldset className={styles.group}>
        <legend className={styles.title}>Сортировка:</legend>
        <div className={styles.select}>
          <label className="visually-hidden" htmlFor="taste-sorting">Сортировка товаров каталога.</label>
          <select className={styles.selectControl} id="taste-sorting" name="taste-sorting" defaultValue="popular">
            <option value="popular">по популярности</option>
            <option value="cheap">сначала дешёвые</option>
            <option value="expensive">сначала дорогие</option>
          </select>
        </div>
      </fieldset>

      <fieldset className={`${styles.group} ${styles.priceGroup}`}>
        <legend className="visually-hidden">Цена.</legend>
        <div className={styles.priceInputs}>
          <label className={styles.priceLabel}>
            Цена: <input className={styles.priceInput} type="number" name="min-price" value={100} readOnly />₽
          </label>
          <label className={styles.priceLabel}>
            - <input className={styles.priceInput} type="number" name="max-price" value={500} readOnly />₽
          </label>
        </div>
        <div className={styles.rangeBlock}>
          <div className={styles.rangeScale}>
            <div className={styles.rangeBar}>
              <button className={`${styles.rangeToggle} ${styles.rangeMin}`} type="button" aria-label="Изменить минимальную цену." />
              <button className={`${styles.rangeToggle} ${styles.rangeMax}`} type="button" aria-label="Изменить максимальную цену." />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className={`${styles.group} ${styles.fatnessGroup}`}>
        <legend className={styles.title}>Жирность:</legend>
        <ul className={styles.controlsList}>
          {fatnessOptions.map((option, index) => (
            <li className={styles.controlItem} key={option}>
              <label className={styles.control}>
                <input
                  className={`${styles.controlInput} visually-hidden`}
                  type="radio"
                  name="fatness"
                  value={option}
                  defaultChecked={index === 1}
                />
                <span className={styles.controlMark}></span>
                <span className={styles.controlLabel}>{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={`${styles.group} ${styles.fillerGroup}`}>
        <legend className={styles.title}>Наполнители:</legend>
        <ul className={styles.controlsList}>
          {fillerOptions.map((option, index) => (
            <li className={styles.controlItem} key={option}>
              <label className={styles.control}>
                <input
                  className={`${styles.controlInput} visually-hidden`}
                  type="checkbox"
                  name={option}
                  defaultChecked={index < 2}
                />
                <span className={styles.controlMark}></span>
                <span className={styles.controlLabel}>{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <button className={styles.submit} type="submit">Применить</button>
    </form>
  )
}

export { CatalogFilter }