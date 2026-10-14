'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button, ConfirmModal, IconButton } from '@/shared/ui'
import { isAdminRole } from '@/shared/lib/roles'

import { authClient } from '../lib/client'
import { AUTH_LOGIN_MODAL_ID, LoginModal } from './LoginModal'
import styles from './AuthControls.module.css'

const LOGOUT_CONFIRM_ID = 'logout-confirm-modal'

interface AuthControlsProps {
  /** класс кнопки из модуля хедера: свой CSS-модуль сюда не импортируется */
  className?: string
}

/**
 * Клиентский остров в шапке. Сессию читаем на клиенте намеренно: чтение cookie
 * на сервере перевело бы все страницы в динамический рендер и убило бы ISR.
 */
const AuthControls = ({ className = '' }: AuthControlsProps) => {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { data: session, isPending } = authClient.useSession()

  // Вход по магической ссылке создаёт юзера с пустым именем, поэтому подписью
  // служит email — имя заведём вместе с аккаунтами.
  const user = session?.user
  const label = user?.name || user?.email

  const handleSignOut = async () => {
    setIsSigningOut(true)

    try {
      await authClient.signOut()
      toast.success('Вы вышли из аккаунта')
      // Уходим явно: страница уже отрисована и proxy повторно не сработает,
      // поэтому без перехода человек остался бы там, куда доступа больше нет.
      router.replace('/')
    } catch {
      toast.error('Не удалось выйти')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <>
      {/*
        Пока сессия едет, контролы неактивны целиком: один клик не должен
        порождать пачку одинаковых запросов. Вид при этом не меняется —
        тот же приём, что в CatalogFilter.
      */}
      <div className={styles.controls} inert={isPending} aria-busy={isPending}>
        {user ? (
          <>
            <IconButton
              className={className}
              variant="transparent"
              icon="login"
              iconSize={16}
              href={isAdminRole(user.role) ? '/admin' : '/account'}
            >
              {label}
            </IconButton>
            <Button
              className={styles.signOut}
              variant="transparent"
              popoverTarget={LOGOUT_CONFIRM_ID}
              popoverTargetAction="show"
            >
              Выйти
            </Button>
          </>
        ) : (
          <IconButton
            className={className}
            variant="transparent"
            icon="login"
            iconSize={16}
            popoverTarget={AUTH_LOGIN_MODAL_ID}
            popoverTargetAction="show"
          >
            Вход
          </IconButton>
        )}
      </div>

      {/* Модалки вне inert-контейнера: refetch по фокусу окна не должен гасить форму */}
      <LoginModal />
      {user && (
        <ConfirmModal
          id={LOGOUT_CONFIRM_ID}
          title="Выйти из аккаунта?"
          message="Сессия будет удалена. Для повторного входа придётся запросить ссылку на почту."
          confirmLabel="Выйти"
          cancelLabel="Отмена"
          pending={isSigningOut}
          onConfirm={handleSignOut}
        />
      )}
    </>
  )
}

export { AuthControls }