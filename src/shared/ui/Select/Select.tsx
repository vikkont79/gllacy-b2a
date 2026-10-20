import { forwardRef, useId } from 'react'

import type { BaseInputProps, Size } from '../../types'
import styles from './Select.module.css'

/*
 * Опция — только данные: разметку <option> собираем внутри. Так вызывающий
 * код не может рассинхронизировать value и подпись и не передаст список
 * дважды — через options и children одновременно.
 */
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/*
 * Нативный <select>, а не кастомный выпадающий список: клавиатура,
 * скринридеры, мобильные «колеса» и закрытие по клику мимо уже работают.
 * Стилизуем рамку и отступы, стрелку оставляем браузерную — на неё
 * не нужно тратить время и она предсказуема на всех платформах.
 */
interface SelectProps
  extends BaseInputProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>,
      | 'size'
      | 'multiple'
      | 'children'
      | 'disabled'
      | 'className'
      | 'placeholder'
      | 'id'
      | 'name'> {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
  size?: Size;
  options: readonly SelectOption[];
  /** Первый пункт-подсказка: виден в поле, но выбрать его нельзя. */
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  defaultValue,
  value,
  placeholder,
  disabled,
  className = '',
  label,
  hiddenLabel = false,
  error,
  size = 'base',
  options,
  ...props
}, ref) => {
  const id = useId()
  const errorId = useId()

  /*
   * Имя выводим из подписи, как в Input/Textarea. При работе с RHF это
   * значение перекроет spread register(): он передаёт собственный name,
   * а идёт после нашего.
   */
  const name = label
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/g, '_')
    .replace(/^_|_$/g, '')

  return (
    <label className={`${styles.selectWrapper} ${className || ''}`.trim()}>
      <span className={hiddenLabel ? 'visually-hidden' : styles.label}>{label}</span>

      {/*
       * default: при наличии placeholder и без явного значения показываем
       * именно его, иначе браузер молча выберет первую реальную опцию.
       */}
      <select
        ref={ref}
        className={`${styles.select} ${styles[size]}`}
        defaultValue={value === undefined ? defaultValue ?? (placeholder ? '' : undefined) : undefined}
        value={value}
        id={id}
        name={name}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {/*
         * hidden — чтобы подсказка не висела в выпадающем списке,
         * disabled — чтобы её нельзя было выбрать. Значение "" заодно
         * не проходит zod-валидацию, если поле обязательное.
         */}
        {placeholder && (
          <option value="" disabled hidden>{placeholder}</option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span id={errorId} role="alert" className={styles.error}>{error}</span>
      )}
    </label>
  )
})

Select.displayName = 'Select'

export { Select, type SelectOption }
