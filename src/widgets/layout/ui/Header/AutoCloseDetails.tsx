'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

interface AutoCloseDetailsProps {
  className?: string
  children: ReactNode
}

const AutoCloseDetails = ({ className, children }: AutoCloseDetailsProps) => {
  const ref = useRef<HTMLDetailsElement>(null)

  const handleClick = (event: MouseEvent<HTMLDetailsElement>) => {
    if ((event.target as HTMLElement).closest('a')) {
      ref.current?.removeAttribute('open')
    }
  }

  return (
    <details ref={ref} className={className} onClickCapture={handleClick}>
      {children}
    </details>
  )
}

export { AutoCloseDetails }