import styles from './ErrorState.module.css'

interface ErrorStateProps {
  message: string
}

const ErrorState = ({ message }: ErrorStateProps) => {
  return <p className={styles.error} role="alert">{message}</p>
}

export { ErrorState }