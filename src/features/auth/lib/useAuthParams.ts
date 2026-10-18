import { useMemo, useSyncExternalStore } from 'react'

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener('popstate', onStoreChange)

  return () => window.removeEventListener('popstate', onStoreChange)
}

export interface AuthParams {
  /** open — открыть форму входа, denied — отказ по роли */
  auth: string | null
  /** откуда пришли, возвращаем после входа */
  from: string | null
  /** код ошибки верификации ссылки */
  error: string | null
  description: string | null
}

/**
 * Параметры адреса как внешний источник, а не состояние. useSyncExternalStore
 * вместо useEffect с setState: значение приходит извне, и ставить его в
 * состояние эффектом запрещено. Во время гидратации React берёт серверный
 * снимок (пустой), поэтому разметка не расходится — и страница остаётся ISR.
 */
const useAuthParams = (): AuthParams => {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => '')

  return useMemo(() => {
    const params = new URLSearchParams(search)

    return {
      auth: params.get('auth'),
      from: params.get('from'),
      error: params.get('error'),
      description: params.get('error_description'),
    }
  }, [search])
}

export { useAuthParams }