'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button, Input, Modal } from '@/shared/ui'

import { getAuthErrorMessage } from '../lib/authErrors'
import { authClient } from '../lib/client'
import { useAuthParams } from '../lib/useAuthParams'
import { magicLinkSchema, type MagicLinkValues } from '../types'
import styles from './LoginModal.module.css'

const AUTH_LOGIN_MODAL_ID = 'auth-login-modal'

/** from допускается только как путь внутри сайта: иначе это open redirect */
const safeReturnTo = (value: string | null): string | undefined => {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return undefined
  }

  return value
}

const LoginModal = () => {
  const router = useRouter()
  const { auth, from, error, description } = useAuthParams()

  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  // Ошибка выводится из адреса, но пользователь может её закрыть — держим
  // код, для которого уже нажали «Запросить заново».
  const [dismissedError, setDismissedError] = useState<string | null>(null)

  const authError =
    error && dismissedError !== error ? getAuthErrorMessage(error, description) : null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MagicLinkValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: '' },
  })

  /**
   * Реакция на редирект от proxy и на провал проверки ссылки. Только чтение
   * адреса, тосты и открытие поповера — всё, что трогает внешние системы.
   */
  useEffect(() => {
    if (error) {
      toast.error('Вход не удался')
    } else if (auth === 'denied') {
      toast.error('Вход только для администратора')
    }

    const popover = document.getElementById(AUTH_LOGIN_MODAL_ID)

    if (
      popover instanceof HTMLElement &&
      (auth === 'open' || error) &&
      !popover.matches(':popover-open')
    ) {
      popover.showPopover()
    }
  }, [auth, error])

  /**
   * Сброс на любом закрытии — Esc, клик мимо, крестик. Иначе повторное
   * открытие продолжит показывать «проверьте почту».
   */
  useEffect(() => {
    const popover = document.getElementById(AUTH_LOGIN_MODAL_ID)

    if (!popover) {
      return
    }

    const handleToggle = (event: Event) => {
      const { newState } = event as Event & { newState?: string }

      if (newState !== 'closed') {
        return
      }

      reset()
      setSubmitted(false)
      setServerError(null)
    }

    popover.addEventListener('toggle', handleToggle)

    return () => popover.removeEventListener('toggle', handleToggle)
  }, [reset])

  const requestLink = async (data: MagicLinkValues) => {
    setServerError(null)
    setDismissedError(null)

    try {
      const { error: sendError } = await authClient.signIn.magicLink({
        email: data.email,
        callbackURL: safeReturnTo(from) ?? '/',
        // Ошибку всегда хотим на главной: из /admin её перехватит proxy и
        // показал бы «нет доступа» вместо «ссылка истекла».
        errorCallbackURL: '/',
      })

      if (sendError) {
        setServerError(sendError.message ?? 'Не удалось отправить ссылку')
        toast.error(sendError.message ?? 'Не удалось отправить ссылку')

        return
      }

      setSubmitted(true)
      // параметр описывает разовый сценарий — убираем из адреса
      router.replace('/', { scroll: false })
      toast.success('Ссылка для входа отправлена')
    } catch {
      setServerError('Не удалось связаться с сервером. Попробуйте позже')
      toast.error('Не удалось отправить ссылку')
    }
  }

  return (
    <Modal
      id={AUTH_LOGIN_MODAL_ID}
      labelledBy={`${AUTH_LOGIN_MODAL_ID}-title`}
    >
      <Button
        className={styles.close}
        variant="transparent"
        popoverTarget={AUTH_LOGIN_MODAL_ID}
        popoverTargetAction="hide"
        aria-label="Закрыть"
      >
        ✕
      </Button>

      <h2 id={`${AUTH_LOGIN_MODAL_ID}-title`} className={styles.title}>
        Вход
      </h2>

      {submitted ? (
        <p className={styles.text}>
          Ссылка отправлена. Откройте письмо — сессия создастся по клику на ссылку.
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(requestLink)} noValidate>
          {authError && (
            <p role="alert" className={styles.error}>
              {authError}
            </p>
          )}

          <Input
            label="Электронная почта"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          {serverError && (
            <p role="alert" className={styles.error}>
              {serverError}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting} className={styles.submit}>
            {isSubmitting ? 'Отправляем…' : 'Получить ссылку'}
          </Button>
          {authError && (
            <Button
              className={styles.retry}
              variant="transparent"
              onClick={() => setDismissedError(error)}
            >
              Запросить ссылку заново
            </Button>
          )}
        </form>
      )}
    </Modal>
  )
}

export { LoginModal, AUTH_LOGIN_MODAL_ID }