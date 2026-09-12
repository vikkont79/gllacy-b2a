import styles from './ErrorState.module.css'

interface ErrorStateProps {
  message: string
}

const ErrorState = ({ message }: ErrorStateProps) => {
  return <p className={styles.error}>{message}</p>
}

export { ErrorState }