'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { authService } from '@/lib/services/auth'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code')
        const email = searchParams.get('email')

        if (!code || !email) {
          throw new Error('Missing authentication parameters')
        }

        // Send the code and email to the backend
        await authService.googleSignIn({ code, email })

        // Redirect to dashboard on success
        router.push('/sports')
      } catch (error: any) {
        console.error('Google auth callback error:', error)
        setError(error.message || 'Authentication failed')
        setIsProcessing(false)
      }
    }

    processCallback()
  }, [searchParams, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Authentication Failed
            </h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0FA958] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 text-[#0FA958] animate-spin" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Completing Authentication
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please wait while we sign you in...
          </p>
        </div>
      </div>
    </div>
  )
}
