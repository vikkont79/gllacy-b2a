'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface AutoCloseDetailsProps {
  className?: string
  children: ReactNode
}

const AutoCloseDetails = ({ className, children }: AutoCloseDetailsProps) => {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    ref.current?.removeAttribute('open')
  }, [pathname])

  return (
    <details ref={ref} className={className}>
      {children}
    </details>
  )
}

export { AutoCloseDetails }