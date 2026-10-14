import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import styles from './ConfirmModal.module.css'

interface ConfirmModalProps {
  /** id поповера: на него ссылаются кнопки через popoverTarget */
  id: string
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  /** пока идёт onConfirm — подтверждение недоступно, чтобы не отправить дважды */
  pending?: boolean
  onConfirm: () => void
}

const ConfirmModal = ({
  id,
  title,
  message,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  pending = false,
  onConfirm,
}: ConfirmModalProps) => {
  const titleId = `${id}-title`

  return (
    <Modal id={id} labelledBy={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button
          className={styles.cancel}
          variant="transparent"
          popoverTarget={id}
          popoverTargetAction="hide"
          disabled={pending}
        >
          {cancelLabel}
        </Button>
        <Button
          className={styles.confirm}
          variant="secondary"
          popoverTarget={id}
          popoverTargetAction="hide"
          disabled={pending}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

export { ConfirmModal }