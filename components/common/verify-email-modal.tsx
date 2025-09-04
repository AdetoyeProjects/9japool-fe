'use client'

import type React from 'react'
import { useState, useRef, useEffect } from 'react'
import { X, Mail, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/providers/auth-provider'
import {
  useVerifyEmailMutation,
  useRequestVerificationMutation,
} from '@/lib/hooks/use-auth-mutations'
import Image from 'next/image'

interface VerifyEmailModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export default function VerifyEmailModal({
  isOpen,
  onClose,
  email,
}: VerifyEmailModalProps) {
  const { closeModal } = useAuth()
  const [step, setStep] = useState<'request' | 'verify'>('verify')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [countdown, setCountdown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const requestVerificationMutation = useRequestVerificationMutation()
  const verifyEmailMutation = useVerifyEmailMutation()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  if (!isOpen) return null

  const handleRequestCode = async () => {
    try {
      await requestVerificationMutation.mutateAsync({ email })
      setStep('verify')
      setErrors({})
      setCode(['', '', '', '', '', ''])
      setCountdown(60)
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to send verification code' })
    }
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    // Clear errors when user starts typing
    if (errors.code) {
      setErrors((prev) => ({ ...prev, code: '' }))
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }

    setCode(newCode)

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    const verificationCode = code.join('')

    if (verificationCode.length !== 6) {
      setErrors({ code: 'Please enter all 6 digits' })
      return
    }

    try {
      await verifyEmailMutation.mutateAsync({
        email,
        token: verificationCode,
      })

      setCode(['', '', '', '', '', ''])
      // Close modal and redirect will be handled by the mutation success
      closeModal()
    } catch (error: any) {
      setErrors({ submit: error.message || 'Invalid verification code' })
      setCode(['', '', '', '', '', ''])
    }
  }

  const isLoading =
    requestVerificationMutation.isPending || verifyEmailMutation.isPending

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-500">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-700"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl h-[600px] animate-in zoom-in-90 slide-in-from-bottom-8 duration-700 ease-out">
        <div className="flex h-full">
          {/* Left Side - Image */}
          <div className="hidden md:block md:w-1/2 relative animate-in slide-in-from-left-6 duration-800 delay-200">
            <div className="relative w-full h-full min-h-[480px] overflow-hidden">
              <Image
                src="/assets/images/login.png"
                alt="9jaPool verification image"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 bg-[#111827] p-8 relative flex flex-col h-full animate-in slide-in-from-right-6 duration-800 delay-300">
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-all hover:scale-125 hover:rotate-90 z-10 animate-in zoom-in-0 duration-500 delay-500 cursor-pointer disabled:opacity-50"
            >
              <X size={24} />
            </button>

            {/* Form Header */}
            <div className="mb-6 flex-shrink-0 text-center">
              <div className="flex justify-center mb-4 animate-in zoom-in-0 duration-600 delay-400">
                {step === 'request' ? (
                  <Mail className="w-16 h-16 text-[#0FA958]" />
                ) : (
                  <CheckCircle className="w-16 h-16 text-[#0FA958]" />
                )}
              </div>

              <h2 className="text-2xl font-extrabold text-white mb-2 tracking-wide animate-in slide-in-from-left-8 duration-600 delay-400">
                {step === 'request'
                  ? 'Check Your Email'
                  : 'Enter Verification Code'}
              </h2>

              <p className="text-white/70 text-sm animate-in slide-in-from-left-6 duration-600 delay-500">
                {step === 'request'
                  ? `We're sending a 6-digit code to ${email}`
                  : `Enter the 6-digit code sent to ${email}`}
              </p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">
                  {errors.submit}
                </p>
              </div>
            )}

            {step === 'request' ? (
              /* Request Step */
              <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                <div className="animate-in fade-in-0 duration-500 delay-600">
                  {requestVerificationMutation.isPending ? (
                    <div className="flex flex-col items-center space-y-4">
                      <Loader2 className="w-8 h-8 text-[#0FA958] animate-spin" />
                      <p className="text-white/70 text-sm">
                        Sending verification code...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-4">
                      <CheckCircle className="w-8 h-8 text-[#0FA958]" />
                      <p className="text-white text-sm text-center">
                        Verification code sent successfully!
                        <br />
                        Please check your email inbox.
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => setStep('verify')}
                  disabled={requestVerificationMutation.isPending}
                  className="w-full bg-[#0FA958] hover:bg-green-600 text-white h-12 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0FA958]/30 active:scale-95 transform-gpu disabled:opacity-50"
                >
                  Continue to Verification
                </Button>
              </div>
            ) : (
              /* Verify Step */
              <form
                onSubmit={handleVerifyCode}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-700 delay-600">
                  {/* OTP Input */}
                  <div className="flex justify-center space-x-3">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(
                            index,
                            e.target.value.replace(/\D/g, '')
                          )
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        disabled={isLoading}
                        className={`w-12 h-12 text-center text-xl font-bold bg-[#232937] border-2 rounded-lg text-white transition-all duration-300 focus:scale-110 focus:shadow-2xl focus:shadow-[#0FA958]/20 focus:border-[#0FA958] hover:border-[#3a4553]/80 transform-gpu disabled:opacity-50 ${
                          errors.code ? 'border-red-500' : 'border-[#3a4553]'
                        }`}
                      />
                    ))}
                  </div>

                  {errors.code && (
                    <p className="text-red-400 text-xs text-center">
                      {errors.code}
                    </p>
                  )}

                  {/* Resend Code */}
                  {/* Resend Code */}
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-2">
                      Didn&apos;t receive the code?
                    </p>

                    {countdown > 0 && (
                      <p className="text-white/50 text-xs mb-2">
                        You can request another verification code in {countdown}{' '}
                        seconds
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleRequestCode}
                      disabled={isLoading || countdown > 0}
                      className="text-[#0FA958] hover:text-green-400 text-sm font-medium transition-all duration-300 hover:scale-105 transform-gpu disabled:opacity-50 disabled:text-white/50 cursor-pointer"
                    >
                      {countdown > 0
                        ? `Resend Code (${countdown}s)`
                        : 'Resend Code'}
                    </button>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4 animate-in slide-in-from-bottom-8 duration-700 delay-800">
                  <Button
                    type="submit"
                    disabled={isLoading || code.join('').length !== 6}
                    className="w-full bg-[#0FA958] hover:bg-green-600 text-white h-12 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0FA958]/30 active:scale-95 transform-gpu disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Email'
                    )}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('request')}
                      disabled={isLoading}
                      className="text-white/70 hover:text-white text-sm transition-all duration-300 hover:scale-105 transform-gpu disabled:opacity-50 cursor-pointer"
                    >
                      ← Back to Email Check
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
