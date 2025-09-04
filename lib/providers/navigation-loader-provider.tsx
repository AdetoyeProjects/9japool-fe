'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth'

export function NavigationLoaderProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setShowLoader } = useAuthStore()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    if (pathname === '/sports') {
      setShowLoader(false)
      setIsNavigating(false)
      return
    }

    setIsNavigating(true)
    setShowLoader(true)

    const timer = setTimeout(() => {
      setIsNavigating(false)
      setShowLoader(false)
    }, 500) // Short delay to show loader

    return () => clearTimeout(timer)
  }, [pathname, searchParams, setShowLoader])

  return <>{children}</>
}
