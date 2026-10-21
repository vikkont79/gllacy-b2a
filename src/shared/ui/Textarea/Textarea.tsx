import { forwardRef, useId } from 'react'

import type { BaseInputProps, Size } from '../../types'
import styles from './Textarea.module.css'

interface TextareaProps
  extends BaseInputProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'disabled' | 'className' | 'placeholder' | 'id' | 'name'> {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
  size?: Size;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  defaultValue,
  placeholder,
  disabled,
  className = '',
  label,
  hiddenLabel = false,
  error,
  size = 'base',
  rows = 4,
  ...props
}, ref) => {
  const id = useId()
  const errorId = useId()
  const name = label
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/g, '_')
    .replace(/^_|_$/g, '')

  return (
    <label className={`${styles.textareaWrapper} ${className || ''}`.trim()}>
      <span className={hiddenLabel ? 'visually-hidden' : styles.label}>{label}</span>
      <textarea
        ref={ref}
        className={`${styles.textarea} ${styles[size]}`}
        defaultValue={defaultValue}
        placeholder={placeholder}
        id={id}
        name={name}
        rows={rows}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} role="alert" className={styles.error}>{error}</span>
      )}
    </label>
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
