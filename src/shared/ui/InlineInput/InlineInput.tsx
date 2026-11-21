'use client'

import type { Size } from '../../types'
import { IconButton } from '../IconButton/IconButton'
import { Input } from '../Input/Input'
import styles from './InlineInput.module.css'

interface InlineInputProps {
  readonly label: string
  readonly value: string
  readonly error?: string
  readonly pending?: boolean
  readonly size?: Size
  readonly type?: string
  readonly inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode']
  readonly className?: string
  readonly onChange: (value: string) => void
  readonly onSave: () => void
  readonly onCancel: () => void
}

const InlineInput = ({
  label,
  value,
  error,
  pending = false,
  size = 'small',
  type = 'text',
  inputMode,
  className = '',
  onChange,
  onSave,
  onCancel,
}: InlineInputProps) => {
  return (
    <div className={styles.row} aria-busy={pending}>
      <Input
        className={className}
        label={label}
        hiddenLabel
        size={size}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing) {
            return
          }

          if (event.key === 'Enter') {
            event.preventDefault()
            onSave()
          }

          if (event.key === 'Escape') {
            event.preventDefault()
            onCancel()
          }
        }}
        autoFocus
        disabled={pending}
        error={error}
      />
      <IconButton
        icon="check"
        variant="transparent"
        iconSize={16}
        iconLabel="Сохранить"
        onClick={onSave}
        disabled={pending}
      />
      <IconButton
        icon="cross"
        variant="transparent"
        iconSize={16}
        iconLabel="Отмена"
        onClick={onCancel}
        disabled={pending}
      />
    </div>
  )
}

export { InlineInput }
