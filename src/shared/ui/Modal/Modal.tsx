import styles from './Modal.module.css'

interface ModalProps {
  /** id поповера: на него ссылается кнопка через popoverTarget */
  id: string
  /** id элемента с заголовком, для aria-labelledby */
  labelledBy?: string
  className?: string
  children: React.ReactNode
}

/**
 * Только логика рендера нативного поповера: открытие, закрытие и клик мимо
 * делает сам браузер через popoverTarget на кнопке. Логики и состояния внутри
 * нет, поэтому компонент рендерится и с сервера, и с клиента.
 */
const Modal = ({ id, labelledBy, className = '', children }: ModalProps) => {
  return (
    <div
      id={id}
      popover="auto"
      aria-labelledby={labelledBy}
      className={`${styles.modal} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export { Modal }