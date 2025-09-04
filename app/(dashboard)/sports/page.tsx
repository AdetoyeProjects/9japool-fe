"use client"
import { useAuthStore } from "@/lib/store/auth"
import { useState, useEffect } from 'react'
import PageLoader from '@/components/common/page-loader'

const Sports = () => {
   const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthStore()
    const { showLoader } = useAuthStore()
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000) // Show loader for 2.5 seconds
  
      return () => clearTimeout(timer)
    }, [])

  return (
    <>
      <PageLoader isVisible={showLoader || isLoading} isLoading={isLoading} />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-400 mb-2">
              Welcome to Sports Dashboard,{' '}
              {user?.name || user?.userName || 'Player'}!
            </h1>
            <p className="text-gray-300">
              Ready to play some pool? Choose your game and start winning!
            </p>
          </div>

          <p>Incoming</p>
        </div>
      </div>
    </>
  )
}

export default Sports
