'use client'

import type React from 'react'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth'
import PageLoader from '@/components/common/page-loader'
  
function NavigationHandler() {
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

  return null
}

export function NavigationLoaderProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<PageLoader isLoading={true} />}>
        <NavigationHandler />
      </Suspense>
      {children}
    </>
  )
}
