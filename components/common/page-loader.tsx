'use client'

import { cn } from '@/lib/utils'
import Loader from './loader'
import { useAuthStore } from '@/lib/store/auth'

interface PageLoaderProps {
  isLoading?: boolean
  className?: string
  isVisible?: boolean
  message?: string
}

const PageLoader = ({ isLoading, className }: PageLoaderProps) => {
  const { showLoader } = useAuthStore()
  const shouldShow = isLoading !== undefined ? isLoading : showLoader

  if (!shouldShow) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-gray-900/80 backdrop-blur-sm',
        className
      )}
    >
      <div className="rounded-lg p-4 shadow-2xl">
        <Loader size="lg" />
      </div>
    </div>
  )
}

export default PageLoader
